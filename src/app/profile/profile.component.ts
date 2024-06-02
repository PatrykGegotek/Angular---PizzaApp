import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  email:string="";
  userData: Observable<firebase.User|null>;
  msg:string="";
  address:string="";
  postcode:string="";
  city:string="";

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute, private router:Router,private angularFireAuth: AngularFireAuth){
    this.userData = angularFireAuth.authState;
    this.userData.subscribe(a=>{
      if(a) {
        if(a.email)this.email=a.email;
        let daneRef = db.object('users/'+this.email.replaceAll(".","!")).valueChanges();
        daneRef.subscribe((val:any)=>{
        if(val.address)this.address=val.address;
        if(val.postcode)this.postcode=val.postcode;
        if(val.city)this.city=val.city;
      });
    }
    });
  }
  save():void{
    if(this.address==""||this.postcode==""|| this.city==""){
      this.msg="Uzupełnij wszystkie pola!"
      return;
    }
    if(this.postcode.length!=6||this.postcode[2]!='-'||!Number(this.postcode.split('-')[0])||!Number(this.postcode.split('-')[1])){
      this.msg="Niepoprawne dane!";
      return;
    }
    let daneRef = this.db.object('users/'+this.email.replaceAll(".","!"));
    daneRef.update({address:this.address, postcode:this.postcode, city:this.city});
  }
}



