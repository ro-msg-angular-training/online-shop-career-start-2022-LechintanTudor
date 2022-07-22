import { Injectable } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductEffects {
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

  // saveProducts$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType()
  //   ),
  // });

  constructor(private actions$: Actions, private productService: ProductService) {}
}
