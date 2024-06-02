import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  link:string="";
  constructor(private storage: AngularFireStorage) {}
  ngOnInit():void{
    this.storage.ref('lokalizacja.png')
      .getDownloadURL()               // it returns url value as observable
      .subscribe((url: string) => {
          this.link=url;
      })
  }
}
