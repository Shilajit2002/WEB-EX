import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class NormalGuard implements CanActivate {
  constructor(private login: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //  If the User is Loggedin and User is NORMAL then the user-dashboard page is accesseble otherwise not
    if (this.login.isLoggedIn() && this.login.getUserRole() == 'NORMAL') {
      return true;
    }
    //  Otherwise redirect login page
    this.router.navigate(['login']);
    return false;
  }
}
