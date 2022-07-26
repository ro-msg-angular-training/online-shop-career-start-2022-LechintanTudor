import { createReducer, on } from '@ngrx/store';
import { Order } from 'src/app/data/order';
import { Product } from 'src/app/data/product';
import { LoadingStatus } from '../common';
import {
  addProduct,
  addProductError,
  addProductSuccess,
  addProductToCart,
  checkoutCart,
  checkoutCartSuccess,
  deleteProduct,
  deleteProductError,
  deleteProductSuccess,
  getProduct,
  getProductError,
  getProducts,
  getProductsError,
  getProductsSuccess,
  getProductSuccess,
  updateProduct,
  updateProductError,
  updateProductSuccess,
} from './product.actions';

export interface ProductState {
  status: LoadingStatus;
  products: Product[];
  selectedProduct: Product | null;
  orders: Order[];
  checkoutStatus: LoadingStatus;
}

const initialState: ProductState = {
  status: 'initial',
  products: [],
  selectedProduct: null,
  orders: [],
  checkoutStatus: 'initial',
};

export const productReducer = createReducer(
  initialState,

  // Add product
  on(addProduct, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(addProductSuccess, (state, { product }) => ({
    ...state,
    status: 'loading',
    products: [...state.products, product],
  })),
  on(addProductError, (state) => ({
    ...state,
    status: 'error',
  })),

  // Get product
  on(getProduct, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(getProductSuccess, (state, { product }) => ({
    ...state,
    status: 'ready',
    selectedProduct: product,
  })),
  on(getProductError, (state) => ({
    ...state,
    status: 'error',
  })),

  // Get products
  on(getProducts, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(getProductsSuccess, (state, { products }) => ({
    ...state,
    status: 'ready',
    products,
  })),
  on(getProductsError, (state) => ({
    ...state,
    status: 'error',
  })),

  // Update product
  on(updateProduct, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(updateProductSuccess, (state, { product }) => ({
    ...state,
    status: 'ready',
    products: state.products.map((oldProduct) => {
      return oldProduct.id === product.id ? product : oldProduct;
    }),
  })),
  on(updateProductError, (state) => ({
    ...state,
    status: 'error',
  })),

  // Delete product
  on(deleteProduct, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(deleteProductSuccess, (state, { productId }) => ({
    ...state,
    status: 'ready',
    products: state.products.filter((product) => product.id !== productId),
  })),
  on(deleteProductError, (state) => ({
    ...state,
    status: 'error',
  })),

  // Shopping cart
  on(addProductToCart, (state, { productId }) => {
    let foundProduct = false;

    const orders = state.orders.map((order) => {
      if (order.productId === productId) {
        foundProduct = true;
        return { productId, quantity: order.quantity + 1 };
      } else {
        return order;
      }
    });

    if (!foundProduct) {
      orders.push({ productId, quantity: 1 });
    }

    return { ...state, orders };
  }),
  on(checkoutCart, (state) => ({
    ...state,
    checkoutStatus: 'loading',
  })),
  on(checkoutCartSuccess, (state) => ({
    ...state,
    checkoutStatus: 'ready',
  })),
  on(addProductError, (state) => ({
    ...state,
    checkoutStatus: 'error',
  }))
);
