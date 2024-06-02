import { Component, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-user-element',
  templateUrl: './user-element.component.html',
  styleUrls: ['./user-element.component.css']
})
export class UserElementComponent {
  @Input() email:string="";
  @Input() admin:boolean=false;
  @Input() manager:boolean=false;
  @Input() client:boolean=false;
  @Input() banned:boolean=false;

  constructor(private db: AngularFireDatabase){}

  adminChange():void{
    this.admin=!this.admin;
    this.db.object('users/'+this.email.replaceAll('.','!')).update({ admin: this.admin });
  }
  clientChange():void{
    this.client=!this.client;
    this.db.object('users/'+this.email.replaceAll('.','!')).update({ client: this.client });
  }
  managerChange():void{
    this.manager=!this.manager;
    this.db.object('users/'+this.email.replaceAll('.','!')).update({ manager: this.manager });
  }
  bannedChange():void{
    this.banned=!this.banned;
    this.db.object('users/'+this.email.replaceAll('.','!')).update({ banned: this.banned });
  }
}
