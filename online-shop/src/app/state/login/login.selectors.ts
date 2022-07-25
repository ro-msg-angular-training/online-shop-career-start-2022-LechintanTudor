import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

const selectLoginState = (state: AppState) => state.login;

export const selectLoggedInUser = createSelector(selectLoginState, (state) => state.user);

export const isLoggedIn = createSelector(selectLoginState, (state) => state.user !== null);

export const selectRedirectUrl = createSelector(selectLoginState, (state) => state.redirectUrl);
