import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/data/user';
import { LoadingStatus } from '../common';
import * as LoginActions from '../login/login.actions';

export interface LoginState {
  status: LoadingStatus;
  user: User | null;
  redirectUrl: string;
}

const initialState: LoginState = {
  status: 'initial',
  user: null,
  redirectUrl: '/',
};

export const loginReducer = createReducer(
  initialState,

  // Login
  on(LoginActions.login, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(LoginActions.loginSuccess, (state, { user }) => ({
    ...state,
    status: 'ready',
    user,
  })),
  on(LoginActions.loginError, (state) => ({
    ...state,
    status: 'error',
  })),

  // Redirect url
  on(LoginActions.setRedirectUrl, (state, { redirectUrl }) => ({
    ...state,
    redirectUrl,
  }))
);
