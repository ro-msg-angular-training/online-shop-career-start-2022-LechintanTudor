import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppState } from '../state/app.state';
import * as LoginActions from '../state/login/login.actions';
import * as LoginSelectors from '../state/login/login.selectors';

@Injectable({
  providedIn: 'root',
})
export class CustomerAuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<true | UrlTree> {
    return this.store.select(LoginSelectors.selectLoggedInUser).pipe(
      map((user) => {
        if (user?.roles.includes('customer')) {
          return true;
        } else {
          this.store.dispatch(LoginActions.setRedirectUrl({ redirectUrl: state.url }));
          return this.router.parseUrl('/login');
        }
      })
    );
  }
}
