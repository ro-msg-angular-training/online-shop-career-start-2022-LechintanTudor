import { Injectable } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { selectLoggedInUser } from '../login/login.selectors';
import { selectOrders } from './product.selectors';
import {
  addProduct,
  addProductSuccess,
  checkoutCart,
  checkoutCartError,
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

@Injectable({
  providedIn: 'root',
})
export class ProductEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private productService: ProductService
  ) {}

  addProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addProduct),
      mergeMap(({ product }) => {
        return this.productService.addProduct(product).pipe(
          map((product) => addProductSuccess({ product })),
          catchError(() => of(getProductError()))
        );
      })
    );
  });

  getProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getProduct),
      mergeMap(({ productId }) => {
        return this.productService.getProduct(productId).pipe(
          map((product) => getProductSuccess({ product })),
          catchError(() => of(getProductError()))
        );
      })
    );
  });

  getProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getProducts),
      mergeMap(() => {
        return this.productService.getProducts().pipe(
          map((products) => getProductsSuccess({ products })),
          catchError(() => of(getProductsError()))
        );
      })
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateProduct),
      mergeMap(({ product }) => {
        return this.productService.updateProduct(product).pipe(
          map(() => updateProductSuccess({ product })),
          catchError(() => of(updateProductError()))
        );
      })
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteProduct),
      mergeMap(({ productId }) => {
        return this.productService.deleteProduct(productId).pipe(
          map(() => deleteProductSuccess({ productId })),
          catchError(() => of(deleteProductError()))
        );
      })
    );
  });

  checkoutCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(checkoutCart),
      withLatestFrom(this.store.select(selectLoggedInUser), this.store.select(selectOrders)),
      mergeMap(([_, user, orders]) => {
        if (user === null) {
          return of(checkoutCartError());
        }

        return this.productService.checkout(user.username, orders).pipe(
          map(() => checkoutCartSuccess()),
          catchError(() => of(checkoutCartError()))
        );
      })
    );
  });
}
