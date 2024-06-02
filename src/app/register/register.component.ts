import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { RolesService } from '../Services/roles.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email_input:string="";
  pwd_input:string="";
  msg:string="";
  
  constructor(private angularFireAuth: AngularFireAuth,private router:Router, private db: AngularFireDatabase, private rs:RolesService) {}
  
  register(){
    this.rs.loggedObservable.next(true);
    this.rs.adminObservable.next(false);
    this.rs.managerObservable.next(false);
    this.rs.clientObservable.next(true);
    this.rs.bannedObservable.next(false);
    this.angularFireAuth.createUserWithEmailAndPassword(this.email_input,this.pwd_input)
    .then(()=>{
      this.db.object('users/'+this.email_input.replaceAll(".","!")).set({admin: false, manager: false, client: true, banned: false});
      this.router.navigate(['/']);
    }).catch((a)=>{
      if (JSON.stringify(a).indexOf("auth/invalid-email")>=0)this.msg="Błędny email.";
      else if (JSON.stringify(a).indexOf("auth/weak-password")>=0)this.msg="Hasło musi zawierać co najmniej 6 liter.";
      else if (JSON.stringify(a).indexOf("auth/email-already-in-use")>=0)this.msg="Konto z tym emailem już istnieje.";
      else this.msg="Błędne dane. Spróbuj ponownie!";
      return;
    });
  }
  goToLoginPage():void{
    this.router.navigate(['/zaloguj']);
  }
  
}
