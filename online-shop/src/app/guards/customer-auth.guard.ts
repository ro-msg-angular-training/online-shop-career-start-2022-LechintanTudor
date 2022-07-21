import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): true | UrlTree {
    if (this.authService.userHasRole('customer')) {
      return true;
    } else {
      this.authService.redirectUrl = state.url;
      return this.router.parseUrl('/');
    }
  }
}
