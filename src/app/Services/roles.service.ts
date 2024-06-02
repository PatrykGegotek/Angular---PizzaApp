import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {Observable, ReplaySubject } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  userData: Observable<firebase.User|null>;
  adminObservable = new ReplaySubject<boolean>();
  clientObservable = new ReplaySubject<boolean>();
  managerObservable = new ReplaySubject<boolean>();
  bannedObservable = new ReplaySubject<boolean>();
  loggedObservable = new ReplaySubject<boolean>();
  emailObservable = new ReplaySubject<string>();
  userUidObservable = new ReplaySubject<string>()

  constructor(private angularFireAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.userData = angularFireAuth.authState; 
    this.userData.subscribe(a=>{
      if(!a?.email)return;
      this.emailObservable.next(a.email);
      this.userUidObservable.next(a.uid);
      let obj=db.object("users/"+a?.email.replaceAll(".","!")).valueChanges();
      obj.subscribe((b:any)=>{
        this.adminObservable.next(b.admin);
        this.clientObservable.next(b.client);
        this.managerObservable.next(b.manager);
        this.bannedObservable.next(b.banned);
      })
    })
  }
}
