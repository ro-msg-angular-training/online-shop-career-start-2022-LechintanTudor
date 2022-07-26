import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription, withLatestFrom } from 'rxjs';
import { Credentials } from '../data/user';
import { AppState } from '../state/app.state';
import { login, loginError, loginSuccess } from '../state/login/login.actions';
import { selectRedirectUrl } from '../state/login/login.selectors';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  loginForm = this.fb.nonNullable.group({
    username: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required),
  });

  loginSuccessSubscription = new Subscription();
  loginErrorSubscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private actions: Actions
  ) {}

  ngOnInit(): void {
    this.loginSuccessSubscription = this.actions
      .pipe(ofType(loginSuccess), withLatestFrom(this.store.select(selectRedirectUrl)))
      .subscribe(([_, redirectUrl]) => {
        this.router.navigateByUrl(redirectUrl);
      });

    this.loginErrorSubscription = this.actions
      .pipe(ofType(loginError))
      .subscribe(() => alert('Failed to log in!'));
  }

  ngOnDestroy(): void {
    this.loginSuccessSubscription.unsubscribe();
    this.loginErrorSubscription.unsubscribe();
  }

  logIn(): void {
    const username = this.loginForm.value.username ?? '';
    const password = this.loginForm.value.password ?? '';
    const credentials: Credentials = { username, password };

    this.store.dispatch(login({ credentials }));
  }
}
