import { Component, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { RolesService } from '../Services/roles.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  new_rating?:number;
  title:string="";
  description:string="";
  date?:Date;
  count:number=0;
  rating_list:Array<any>=[];
  @Input() id:number=0;
  @Input() old_rating:number=0;
  msg:string="";
  email:string="";
  banned:boolean=false;
  client:boolean=false;
  manager:boolean=false;
  reviewed:boolean=false;
  bought:boolean=false;

  constructor(private db: AngularFireDatabase, rs:RolesService){
    let orders=this.db.list("orders/"+this.email).valueChanges();
    orders.subscribe(a=>{
      a.forEach((b:any)=>{
        let list:any = Object.values(b);
        list.forEach((c:any)=>{
          if(Object.keys(c)[0]==String(this.id))this.bought=true;
        });
      });
    });
    rs.bannedObservable.subscribe(a=>{
      this.banned=a; 
      if(a)this.msg="Nie masz możliwości oceniania i zostawiania komentarzy!";
    });
    rs.clientObservable.subscribe(a=>this.client=a);
    rs.managerObservable.subscribe(a=>this.manager=a);
    rs.emailObservable.subscribe(a=>this.email=a.replaceAll(".","!"));
  }
  ngOnInit(){
    let daneRef = this.db.list('ratings/'+String(this.id)).valueChanges();
    daneRef.subscribe((val:Array<any>)=>{
      this.count=val.reduce((prev,curr)=>{
        if(curr.rating)return prev+1;
        else return prev;
      },0);
      this.rating_list=val;
      if(this.rating_list.length==0)this.msg="Brak opinii";
      this.rating_list.forEach((a:any)=>{
        if(a.email==this.email.replaceAll("!","."))
          this.reviewed=true;
      });
    });
  }
  clean():void{
    this.date=undefined;
    this.new_rating=undefined;
    this.msg="";
  }
  addRating():void{
    if(this.title===""||this.description.length<50||this.description.length>500||this.client && !this.new_rating||
    this.new_rating && this.new_rating<1|| this.new_rating && this.new_rating>5){
      this.msg="Błędne dane!"
      return;
    }
    const daneRef = this.db.object('ratings/'+String(this.id)+'/'+this.email);
    let normal_email=this.email.replaceAll("!",".");
    if(this.new_rating===undefined && this.date===undefined)
      daneRef.set({title: this.title,description: this.description,email:normal_email});
    else if(this.new_rating===undefined)
      daneRef.set({title: this.title,description: this.description, date:this.date ,email:normal_email});
    else if(this.date===undefined) 
      daneRef.set({ title: this.title,description: this.description,rating: this.new_rating ,email:normal_email});
    else
    daneRef.set({title: this.title,description: this.description,rating: this.new_rating, date:this.date ,email:normal_email});

    const daneRef1 = this.db.object('dishes/'+String(this.id));
    if(this.count===0 && this.new_rating){
      daneRef1.update({ rating: this.new_rating });
    }
    else if(this.new_rating){
      let newer_rating:number=(this.old_rating*this.count+this.new_rating)/(this.count+1);
      newer_rating=Math.round(newer_rating*10)/10;
      daneRef1.update({ rating: newer_rating });
    }
    this.clean(); 
  }
}
