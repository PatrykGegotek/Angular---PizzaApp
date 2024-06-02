import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { CartService, DishGeneral } from '../Services/cart.service';
import { RolesService } from '../Services/roles.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers:[DatePipe]
})
export class CartComponent {
  reserved:Array<DishGeneral>=[];
  date:string="";
  msg:string="";
  uid:string="";
  dates:string[] = [];
  history:any[] = [];
  constructor(private cs:CartService,private db: AngularFireDatabase, private rs:RolesService, private datePipe: DatePipe){
    cs.reservedObservable.subscribe(r=>this.reserved=r);
    rs.userUidObservable.subscribe(uid => {
      this.uid = uid;
      var daneRef = db.list('orders/' + this.uid).valueChanges();
      daneRef.subscribe((orders: any[])=>{
        this.history = []
        // @ts-ignore
        for (const key in orders) {
          var order = orders[key]
          if (order[0]) {
            this.history.push({'date': order[0].date, 'dishes': order})
            this.dates.push(order[0].date)
          }
        }
      });
    });
    let tranformed_date = this.datePipe.transform(new Date(), 'dd-MM-yyyy hh:mm:ss');
    if(tranformed_date)this.date=tranformed_date;
  }
  getPriceSum():number{
    return Math.round(this.reserved.reduce(function(prev,curr){return prev+curr.ordered*curr.price},0)*100)/100;
  }
  buy():void{
    var orderDir = this.db.database.ref("orders")
    var currentDate = new Date();

    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var hour = currentDate.getHours();
    var minutes = currentDate.getMinutes();

    var formattedDate = day + '/' + month + '/' + year + ' ' + hour + ':' + minutes;
    var listOfOrders: { id: number; amount: number; name: String; price: number; date: string; }[] = []
    this.reserved.forEach((a:DishGeneral)=>{
      listOfOrders.push({'id': a.id, 'amount': a.ordered, 'name':a.name, 'price':a.price, 'date': formattedDate})
      this.db.object("dishes/"+a.id).update({max_amount: a.max_amount})
    });
    orderDir.child(this.uid).push(listOfOrders);
    this.cs.count=0;
    this.cs.countObservable.next(0);
    this.cs.reserved.splice(0,this.cs.reserved.length);
    this.cs.reservedObservable.next([]);
    this.msg="Dziękujemy za zakupy!";
  }
}
