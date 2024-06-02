import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faChevronRight, faPlusCircle, faMinusCircle, faTrash} from '@fortawesome/free-solid-svg-icons';
import { CartService, DishGeneral } from '../Services/cart.service';
import { RolesService } from '../Services/roles.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent{
  faChevronLeft=faChevronLeft;
  faChevronRight=faChevronRight;
  faPlusCircle=faPlusCircle;
  faMinusCircle=faMinusCircle;
  faTrash=faTrash;
  @Input() id:number=0;
  @Input() name:String="";
  @Input() origin:String="";
  @Input() type:String="";
  @Input() ingridients:String="";
  @Input() max_amount:number=0;
  @Input() price:number=0;
  @Input() description:String="";
  @Input() link_to_photos:Array<String>=[];
  @Input() isExp:boolean=false;
  @Input() isCheap:boolean=false;
  @Input() rating:number=0;
  photoIndex:number=0;
  photoLink:String="";
  ordered:number=0;
  client:boolean=false;
  manager:boolean=false;

  constructor(private db: AngularFireDatabase,private route:ActivatedRoute,private router:Router,private cs:CartService, private rs:RolesService){}
  
  ngOnInit():void{
    this.photoLink=this.link_to_photos[this.photoIndex];

    this.cs.reservedObservable.subscribe(r=>{
    let d=r.filter(a=>a.id===this.id);
    if(d.length===0)this.ordered=0;
    else{
      let idx:number=r.indexOf(d[0]);
      this.ordered=r[idx].ordered;
    }
  });
  this.rs.clientObservable.subscribe(a=>this.client=a);
  this.rs.managerObservable.subscribe(a=>this.manager=a);
  }
  goToDetails(){
    if(!this.client && !this.manager)return;
    this.router.navigate(['/produkt', this.id]);
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
  deleteDish():void{
    const daneRef = this.db.object('dishes/'+String(this.id));
    daneRef.remove();
  }
}
