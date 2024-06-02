import { Component} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})

export class DishesComponent{
  dish_list:Array<Dish>=new Array<Dish>;
  ordered:number=0;
  daneRef: Observable<any[]>;
  page:number=1;
  elements_on_page:number=20;

  constructor(private db: AngularFireDatabase){
    this.daneRef = db.list('dishes').valueChanges();
    this.daneRef.subscribe((val)=>{
    this.dish_list.splice(0,this.dish_list.length);
      for(let i:number=0;i<val.length;i++){
        let links:Array<String>=val[i].link_to_photos.split(",");
        let new_dish:Dish=new Dish(val[i].index,val[i].name,val[i].origin,val[i].type,val[i].ingridients,val[i].max_amount,val[i].price,val[i].description,links,val[i].rating);
        this.dish_list.push(new_dish);
      }
    });
  }
  findCheapExp():void{
    if(this.dish_list.length===0)return;
    this.dish_list.forEach(function(d:Dish){d.isCheap=false;d.isExp=false;})
    let sorted_dish_list:Array<Dish>=this.dish_list.slice();
    sorted_dish_list.sort((a,b)=>a.price-b.price);
    let cheap_dish=sorted_dish_list[0];
    cheap_dish.isCheap=true;
    let exp_dish=sorted_dish_list[sorted_dish_list.length-1];
    exp_dish.isExp=true;
  }
  order():void{
    this.ordered++;
  }
  resign():void{
    this.ordered--;
  }
  getPag(arr:Array<number>):void{
    this.page=arr[0];
    this.elements_on_page=arr[1];
  }
}
class Dish{
  id:number=0;
  name:String="";
  origin:String="";
  type:String="";
  ingridients:String="";
  max_amount:number=0;
  price:number=0;
  description:String="";
  link_to_photos:Array<String>=[];
  isExp:boolean=false;
  isCheap:boolean=false;
  rating:number=0;
  constructor(id:number,n:String,o:String,t:String,i:String,m:number,p:number,d:String,l:Array<String>,r:number){
    this.id=id;
    this.name=n;
    this.origin=o;
    this.type=t;
    this.ingridients=i;
    this.max_amount=m;
    this.price=p;
    this.description=d;
    this.link_to_photos=l;
    this.rating=r;
  }
}
