import { Injectable } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductEffects {
  addProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.addProduct),
      mergeMap(({ product }) => {
        return this.productService.addProduct(product).pipe(
          map((product) => ProductActions.addProductSuccess({ product })),
          catchError(() => of(ProductActions.getProductError()))
        );
      })
    );
  });

  getProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.getProduct),
      mergeMap(({ productId }) => {
        return this.productService.getProduct(productId).pipe(
          map((product) => ProductActions.getProductSuccess({ product })),
          catchError(() => of(ProductActions.getProductError()))
        );
      })
    );
  });

  getProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.getProducts),
      mergeMap(() => {
        return this.productService.getProducts().pipe(
          map((products) => ProductActions.getProductsSuccess({ products })),
          catchError(() => of(ProductActions.getProductsError()))
        );
      })
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap(({ product }) => {
        return this.productService.updateProduct(product).pipe(
          map(() => ProductActions.updateProductSuccess({ product })),
          catchError(() => of(ProductActions.updateProductError()))
        );
      })
    );
  });

  constructor(private actions$: Actions, private productService: ProductService) {}
}
