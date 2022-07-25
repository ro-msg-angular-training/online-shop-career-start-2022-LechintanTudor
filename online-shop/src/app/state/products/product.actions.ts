import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/data/product';

////////////////////////////////////////////////////////////////////////////////
// Add product
////////////////////////////////////////////////////////////////////////////////

export const addProduct = createAction(
  '[Add Product Form] Add product',
  props<{ product: Product }>()
);

export const addProductSuccess = createAction(
  '[API] Add Product Success',
  props<{ product: Product }>()
);

export const addProductError = createAction('[API] Add Product Error');

////////////////////////////////////////////////////////////////////////////////
// Get product
////////////////////////////////////////////////////////////////////////////////

export const getProduct = createAction(
  '[Edit Product Form] Get Product',
  props<{ productId: number }>()
);

export const getProductSuccess = createAction(
  '[API] Get Product Success',
  props<{ product: Product }>()
);

export const getProductError = createAction('[API] Get Product Error');

////////////////////////////////////////////////////////////////////////////////
// Get products
////////////////////////////////////////////////////////////////////////////////

export const getProducts = createAction('[Product List] Get Products');

export const getProductsSuccess = createAction(
  '[API] Get Products Success',
  props<{ products: Product[] }>()
);

export const getProductsError = createAction('[API] Get Products Error');

////////////////////////////////////////////////////////////////////////////////
// Update product
////////////////////////////////////////////////////////////////////////////////

export const updateProduct = createAction(
  '[Edit Product Form] Update Product',
  props<{ product: Product }>()
);

export const updateProductSuccess = createAction(
  '[API] Update Product Success',
  props<{ product: Product }>()
);

export const updateProductError = createAction('[API] Update Product Error');

////////////////////////////////////////////////////////////////////////////////
// Delete product
////////////////////////////////////////////////////////////////////////////////

export const deleteProduct = createAction(
  '[Product List] Delete Product',
  props<{ productId: number }>()
);

export const deleteProductSuccess = createAction(
  '[API] Delete Product Success',
  props<{ productId: number }>()
);

export const deleteProductError = createAction('[API] Delete Product Error');
