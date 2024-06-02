import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RolesService } from '../Services/roles.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {
  manager:boolean=false;
  constructor( private rs: RolesService, public router: Router){
    rs.managerObservable.subscribe(a=>this.manager=a);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.manager){
        this.router.navigate(['/']) ; 
        return false;
      }
      return true;
    }
  }