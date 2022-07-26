import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/data/user';
import { LoadingStatus } from '../common';
import { login, loginError, loginSuccess, setRedirectUrl } from './login.actions';

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
  on(login, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    status: 'ready',
    user,
  })),
  on(loginError, (state) => ({
    ...state,
    status: 'error',
  })),

  // Redirect url
  on(setRedirectUrl, (state, { redirectUrl }) => ({
    ...state,
    redirectUrl,
  }))
);
