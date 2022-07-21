import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/data/product';
import { LoadingStatus } from '../common';
import { getProducts } from './product.actions';

export interface ProductState {
  products: Product[];
  status: LoadingStatus;
}

const initialState: ProductState = {
  products: [],
  status: 'initial',
};

export const productReducer = createReducer(
  initialState,
  on(getProducts, (state) => ({
    ...state,
    status: 'loading',
  }))
);
