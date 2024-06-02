import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { RolesService } from '../Services/roles.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent{

  email_input:string="";
  pwd_input:string="";
  msg:string="";
  
  constructor(private angularFireAuth: AngularFireAuth,private router:Router,private rs:RolesService,private db: AngularFireDatabase) {
    this.angularFireAuth.useDeviceLanguage();
  }
  login(){
    this.rs.loggedObservable.next(true);
    this.angularFireAuth.signInWithEmailAndPassword(this.email_input,this.pwd_input)
    .then(()=>{
      let daneRef = this.db.object('users/'+this.email_input.replaceAll(".","!")).valueChanges();
      daneRef.subscribe((val:any)=>{
      this.rs.adminObservable.next(val.admin);
      this.rs.managerObservable.next(val.manager);
      this.rs.clientObservable.next(val.client);
      this.rs.bannedObservable.next(val.banned);
      this.router.navigate(['/']);
      });
    }).catch((a)=>{
      if (JSON.stringify(a).indexOf("auth/wrong-password")>=0)this.msg="Złe hasło.";
      else if (JSON.stringify(a).indexOf("auth/invalid-email")>=0)this.msg="Błędny email.";
      else if (JSON.stringify(a).indexOf("auth/user-not-found")>=0)this.msg="Użytkownik o podanym emailu nie istnieje.";
      else this.msg="Błędne dane. Spróbuj ponownie!";
      });
  }
  forgotPassword(){
    if(this.email_input.length==0){
      this.msg="Podaj email";
      return;
    }
    this.angularFireAuth.sendPasswordResetEmail(this.email_input)
    .then(()=>this.msg="Wysłano email w celu zresetowania hasła")
    .catch((a)=>{
      if (JSON.stringify(a).indexOf("auth/invalid-email")>=0)this.msg="Błędny email.";
      else if (JSON.stringify(a).indexOf("auth/user-not-found")>=0)this.msg="Użytkownik o podanym emailu nie istnieje.";
      else this.msg="Błędne dane. Spróbuj ponownie!";
      });
  }
  
}
