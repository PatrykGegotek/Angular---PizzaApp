import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { CartService } from './Services/cart.service';
import firebase from 'firebase/compat/app';
import { RolesService } from './Services/roles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'catering';
  ordered:number=0;
  isLoggedIn:boolean=false;
  userData: Observable<firebase.User|null>;
  name:string="";
  admin:boolean=false;
  client:boolean=false;
  manager:boolean=false; 

  constructor(private cs:CartService,private angularFireAuth: AngularFireAuth, private rs:RolesService, private router:Router){
    this.userData = angularFireAuth.authState;
    this.userData.subscribe(a=>{
      if(!a){this.isLoggedIn=false;rs.loggedObservable.next(false);}
      else {
        rs.loggedObservable.next(true);
        this.isLoggedIn=true;
        if(a.email)this.name=a.email.split('@')[0];
      }
    });
    this.rs.adminObservable.subscribe(a=>this.admin=a);
    this.rs.clientObservable.subscribe(a=>this.client=a);
    this.rs.managerObservable.subscribe(a=>this.manager=a);
    this.cs.countObservable.subscribe(c=>this.ordered=c);
  }
  logout():void{
    this.rs.loggedObservable.next(false);
    this.angularFireAuth.signOut();
    this.rs.adminObservable.next(false);
    this.rs.clientObservable.next(false);
    this.rs.managerObservable.next(false);
    this.cs.count=0;
    this.cs.countObservable.next(0);
    this.cs.reservedObservable.next([]);
    this.cs.reserved.splice(0);
    this.router.navigate(['/']);
  }
  goToProfile():void{
    this.router.navigate(['/profil']);
  }
}
