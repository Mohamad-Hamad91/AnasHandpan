import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdGuard implements CanActivate {

  authorized = false;
  roles: any;

  constructor(private _router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authorized = false;
    if (this.isLoggedIn()) {
      const currentUserRole = this.getRole();

      if (route.data.roles) {
        for (let i = 0; i < route.data.roles.length; i++) {
          if (route.data.roles[i] === currentUserRole) {
            this.authorized = true;
            break;
          }
        }
        if (this.authorized === false) {
          this._router.navigate(['/login']);
        }
        return this.authorized;
      } else {
        return true;
      }
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isLoggedIn() {
    return !!localStorage.getItem('role');
  }

}
