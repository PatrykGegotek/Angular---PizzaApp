import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  count:number=0;
  reserved:Array<DishGeneral>=[];
  countObservable = new BehaviorSubject<number>(this.count);
  reservedObservable = new BehaviorSubject<Array<DishGeneral>>(this.reserved);
  constructor() { }
}
export class DishGeneral{
  id:number=0;
  name:String="";
  price:number=0;
  max_amount:number=0;
  link_to_photos:Array<String>=[];
  ordered:number=0;

  constructor(id:number,n:String,o:number,m:number,p:number,l:Array<String>){
    this.id=id;
    this.name=n;
    this.max_amount=m;
    this.price=p;
    this.link_to_photos=l;
    this.ordered=o;
  }
}