import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/data/product';

export const addProduct = createAction(
  '[Add Product Form] Add product',
  props<{ product: Product }>()
);

export const getProducts = createAction('[Product List] Get Products');

export const getProductsSuccess = createAction(
  '[API] Get Products Success',
  props<{ products: Product[] }>()
);

export const getProductsError = createAction('[API] Get Products Error');

export const updateProduct = createAction(
  '[Edit Product Form] Edit Product',
  props<{ product: Product }>()
);

export const deleteProduct = createAction(
  '[Product List] Delete Product',
  props<{ productId: number }>()
);
