import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-dish-management',
  templateUrl: './dish-management.component.html',
  styleUrls: ['./dish-management.component.css']
})
export class DishManagementComponent {
  faChevronLeft=faChevronLeft;
  id:number=0;
  description:string="";
  ingridients:string="";
  type:string="";
  origin:string="";
  name:string="";
  price:number=0;
  max_amount:number=0;
  msg:string="";

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute, private router:Router){
    this.route.params.subscribe(params => {;
      this.id = Number(params['id']);
    });

    let daneRef = db.object('dishes/'+this.id).valueChanges();
    daneRef.subscribe((val:any)=>{
      this.description=val.description;
      this.ingridients=val.ingridients;
      this.type=val.type;
      this.origin=val.origin;
      this.name=val.name;
      this.price=val.price;
      this.max_amount=val.max_amount;
    });
  }

  goBack():void{
    this.router.navigate(['/produkt',this.id]);
  }
  save():void{
    if(this.description==""||this.ingridients==""|| this.type==""||this.origin==""||this.name==""){
      this.msg="Uzupełnij wszystkie pola!"
      return;
    }
    if(this.price<=0||this.max_amount<0||!Number.isSafeInteger(this.max_amount)){
      this.msg="Niepoprawne dane!"
      return;
    }
    let daneRef = this.db.object('dishes/'+this.id);
    daneRef.update({name:this.name});
    this.goBack();
  }
}
