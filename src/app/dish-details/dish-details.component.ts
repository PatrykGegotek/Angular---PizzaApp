import { Component } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { ActivatedRoute, Router} from '@angular/router';
import { faChevronLeft, faChevronRight, faPlusCircle, faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { CartService, DishGeneral } from '../Services/cart.service';
import { RolesService } from '../Services/roles.service';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent {
  faChevronLeft=faChevronLeft;
  faChevronRight=faChevronRight;
  faPlusCircle=faPlusCircle;
  faMinusCircle=faMinusCircle;
  id:number=0;
  name:string="";
  origin:string="";
  type:string="";
  ingridients:string="";
  max_amount:number=0;
  price:number=0;
  description:string="";
  link_to_photos:Array<string>=[];
  photoIndex:number=0;
  photoLink:string="";
  ordered:number=0;
  rating:number=0;
  client:boolean=false;
  manager:boolean=false;

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute,private router:Router,private cs:CartService,private rs:RolesService) {
    rs.clientObservable.subscribe(a=>this.client=a);
    rs.managerObservable.subscribe(a=>this.manager=a);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {;
      this.id = Number(params['id']);
    });
    let daneRef:Observable<any>= this.db.object('dishes/'+String(this.id)).valueChanges();
    daneRef.subscribe((val)=>{
      this.name=val.name;
      this.origin=val.origin;
      this.type=val.type;
      this.ingridients=val.ingridients;
      this.max_amount=val.max_amount;
      this.price=val.price;
      this.description=val.description;
      this.rating=val.rating;
      this.link_to_photos=val.link_to_photos.split(",");
      this.photoLink=this.link_to_photos[this.photoIndex];
    })

    this.cs.reservedObservable.subscribe(r=>{
      let d=r.filter(a=>a.id===this.id);
      if(d.length===0)this.ordered=0;
      else{
        let idx:number=r.indexOf(d[0]);
        this.ordered=r[idx].ordered;
      }
    });
  }

  nextImg():void{
    if(this.photoIndex<this.link_to_photos.length-1)
      this.photoIndex++;
    else this.photoIndex=0;
    this.photoLink=this.link_to_photos[this.photoIndex];
  }
  prevImg():void{
    if(this.photoIndex>0)
      this.photoIndex--;
    else this.photoIndex=this.link_to_photos.length-1;
    this.photoLink=this.link_to_photos[this.photoIndex];
  }
  order():void{
    this.max_amount--;
    this.ordered++;
    this.cs.countObservable.next(++this.cs.count);
    let d=this.cs.reserved.filter(a=>a.id===this.id);
    if(d.length===0)this.cs.reserved.push(new DishGeneral(this.id,this.name,this.ordered,this.max_amount,this.price,this.link_to_photos));
    else{
      let idx:number=this.cs.reserved.indexOf(d[0]);
      this.cs.reserved[idx].ordered=this.ordered;
      this.cs.reserved[idx].max_amount=this.max_amount;
    }
    this.cs.reservedObservable.next(this.cs.reserved);
  }
  resign():void{
    if(this.ordered>0)
    {
      this.max_amount++;
      this.ordered--;
      this.cs.countObservable.next(--this.cs.count);

      let d=this.cs.reserved.filter(a=>a.id===this.id);
      let idx:number=this.cs.reserved.indexOf(d[0]);
      this.cs.reserved[idx].ordered=this.ordered;
      this.cs.reserved[idx].max_amount=this.max_amount;
      if(this.ordered===0)this.cs.reserved.splice(idx,1);
      this.cs.reservedObservable.next(this.cs.reserved);
    }
  }
  goBack():void{
    this.router.navigate(['/menu']);
  }
  goToEdit(){
    if(!this.client && !this.manager)return;
    this.router.navigate(['/edytuj', this.id]);
  }
}
