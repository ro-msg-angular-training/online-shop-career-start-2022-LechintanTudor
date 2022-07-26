import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { login, loginError, loginSuccess } from './login.actions';

@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      mergeMap(({ credentials }) => {
        return this.authService.login(credentials).pipe(
          map((user) => loginSuccess({ user })),
          catchError(() => of(loginError()))
        );
      })
    );
  });
}
