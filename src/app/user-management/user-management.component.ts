import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {
  daneRef: Observable<unknown>;
  users:Array<string>=[];
  data:Array<Array<boolean>>=[];

  
  constructor(private db: AngularFireDatabase){
    this.daneRef = db.object('users').valueChanges();
    this.daneRef.subscribe((val:any)=>{
    this.users=Object.keys(val);
    this.users.forEach(function(val,idx,arr){arr[idx]=val.replaceAll("!",".")});
    let arr=Array.from(Object.values(val));
    arr.forEach((a:any)=>this.data.push([a.admin,a.client,a.manager,a.banned]));
    });
  }
}
