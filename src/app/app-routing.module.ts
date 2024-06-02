import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishesComponent } from './dishes/dishes.component';
import { AddingDishComponent } from './adding-dish/adding-dish.component'
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AdminGuard } from './guard/admin.guard';
import { CartGuard } from './guard/cart.guard';
import { ManagerGuard } from './guard/manager.guard';
import { DishManagementComponent } from './dish-management/dish-management.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [ 
  { path: 'menu', component: DishesComponent }, 
  { path: 'profil', component: ProfileComponent, canActivate: [CartGuard] }, 
  { path: 'dodaj', component: AddingDishComponent, canActivate: [ManagerGuard] },
  { path: 'koszyk', component: CartComponent },
  { path: 'produkt/:id', component: DishDetailsComponent },
  { path: 'zarejestruj', component: RegisterComponent},
  { path: 'zaloguj', component: LogInComponent},
  { path: 'admin', component: AdminViewComponent,  canActivate: [AdminGuard] },
  { path: 'edytuj/:id', component: DishManagementComponent,  canActivate: [ManagerGuard] },
  { path: '', component: HomeComponent } 
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
