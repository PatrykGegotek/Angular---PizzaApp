import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DishesComponent } from './dishes/dishes.component';
import { DishComponent } from './dish/dish.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddingDishComponent } from './adding-dish/adding-dish.component'
import { FormsModule } from '@angular/forms';
import { RatingComponent } from './rating/rating.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { CommentComponent } from './comment/comment.component';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserElementComponent } from './user-element/user-element.component';
import { DishManagementComponent } from './dish-management/dish-management.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './profile/profile.component';

const environment = {
  firebase:{
  apiKey: "AIzaSyAPT0oI3tanDZOLqBM5LUWUZM6xqnnwolg",
  authDomain: "restaurantabc.firebaseapp.com",
  projectId: "restaurantabc",
  storageBucket: "restaurantabc.appspot.com",
  messagingSenderId: "1020683998852",
  appId: "1:1020683998852:web:7fdba5059026303e3514d1",
  databaseURL: "https://restaurantabc-default-rtdb.europe-west1.firebasedatabase.app"
}
};


@NgModule({
  declarations: [
    AppComponent,
    DishesComponent,
    DishComponent,
    AddingDishComponent,
    RatingComponent,
    HomeComponent,
    CartComponent,
    DishDetailsComponent,
    CommentComponent,
    RegisterComponent,
    LogInComponent,
    AdminViewComponent,
    UserManagementComponent,
    UserElementComponent,
    DishManagementComponent,
    ProfileComponent
  ],
  imports: [
    MatTabsModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
