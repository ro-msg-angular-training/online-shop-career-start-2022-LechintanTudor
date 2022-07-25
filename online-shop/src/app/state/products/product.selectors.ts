import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectProductState = (state: AppState) => state.products;

export const selectProducts = createSelector(selectProductState, (products) => products.products);
