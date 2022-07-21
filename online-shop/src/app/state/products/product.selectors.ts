import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

const selectProductState = (appState: AppState) => appState.products;

export const selectProducts = createSelector(selectProductState, (products) => products.products);
