import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, skip } from 'rxjs/operators';
import { RolesService } from '../Services/roles.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  admin:boolean=false;
  constructor( private rs: RolesService, public router: Router, private angularFireAuth: AngularFireAuth){
    rs.adminObservable.subscribe(a=>this.admin=a);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.admin){
        this.router.navigate(['/']) ; 
        return false;
      }
      return true;    
    }
}
