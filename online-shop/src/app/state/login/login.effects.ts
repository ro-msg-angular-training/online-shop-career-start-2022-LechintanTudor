import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as LoginActions from './login.actions';

@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.login),
      mergeMap(({ credentials }) => {
        return this.authService.login(credentials).pipe(
          map((user) => LoginActions.loginSuccess({ user })),
          catchError(() => of(LoginActions.loginError()))
        );
      })
    );
  });
}
