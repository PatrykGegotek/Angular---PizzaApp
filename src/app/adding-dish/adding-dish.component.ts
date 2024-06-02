import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-adding-dish',
  templateUrl: './adding-dish.component.html',
  styleUrls: ['./adding-dish.component.css']
})
export class AddingDishComponent {
  message:string="Dodaj danie";
  name:string="";
  origin:string="";
  type:string="";
  ingridients:string="";
  max_amount:string="";
  price:string="";
  description:string="";
  link_to_photos:string="";
  count:number=0;
  index:number=0;

  constructor(private db: AngularFireDatabase){}
  
  ngOnInit():void{
    let daneRef = this.db.list('dishes').valueChanges();
    daneRef.subscribe((val:any)=>{
      this.count=val.length;
      if(this.count!==0)this.index=val[this.count-1].index+1;
    });
  }
  clean():void{
    this.name=this.origin=this.type=this.ingridients=this.max_amount=this.price=this.description=this.link_to_photos="";
  }
  addDish():void{
    if(this.name.trim()==="" || this.origin.trim()===""||this.type.trim()===""||this.ingridients.trim()===""||this.price.trim()===""||
    this.description.trim()===""||this.link_to_photos.split(",").length<2){
      this.message="Błędne dane!";
      return;
    }
    const daneRef = this.db.object('dishes/'+String(this.index));
    daneRef.set({ index: this.index, name: this.name,origin: this.origin,type: this.type,ingridients: this.ingridients, max_amount: Number(this.max_amount),
      price: Number(this.price),description: this.description,link_to_photos: this.link_to_photos, rating: 0});
    this.message="Sukces!";
    this.clean();
  }
}
