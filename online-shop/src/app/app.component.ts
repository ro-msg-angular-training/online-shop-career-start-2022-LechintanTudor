import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { setRedirectUrl } from './state/login/login.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store<AppState>) {}

  resetRedirectUrl(): void {
    this.store.dispatch(setRedirectUrl({ redirectUrl: '/' }));
  }
}
