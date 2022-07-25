import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from '../data/product';
import { AppState } from '../state/app.state';
import * as ProductActions from '../state/products/product.actions';
import * as ProductSelectors from '../state/products/product.selectors';

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.scss'],
})
export class EditProductFormComponent implements OnInit, OnDestroy {
  selectedProduct$ = this.store.select(ProductSelectors.selectSelectedProduct);
  selectedProductSubscription: Subscription = new Subscription();
  updateProductSuccessSubscription: Subscription = new Subscription();
  updateProductErrorSubscription: Subscription = new Subscription();

  productId = -1;
  detailsForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    image: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private actions: Actions
  ) {}

  ngOnInit(): void {
    this.selectedProductSubscription = this.selectedProduct$.subscribe((product) => {
      if (product !== null) {
        this.detailsForm.patchValue(product);
      }
    });

    this.updateProductSuccessSubscription = this.actions
      .pipe(ofType(ProductActions.updateProductSuccess))
      .subscribe(() => {
        alert('Product updated successfully!');
        this.router.navigateByUrl('/products');
      });

    this.updateProductErrorSubscription = this.actions
      .pipe(ofType(ProductActions.updateProductError))
      .subscribe(() => alert('Failed to update product!'));

    this.productId = parseInt(this.route.snapshot.paramMap.get('id') ?? '', 10);
    this.store.dispatch(ProductActions.getProduct({ productId: this.productId }));
  }

  ngOnDestroy(): void {
    this.selectedProductSubscription.unsubscribe();
    this.updateProductSuccessSubscription.unsubscribe();
    this.updateProductErrorSubscription.unsubscribe();
  }

  submitEdits(): void {
    const product: Product = {
      id: this.productId,
      name: this.detailsForm.value.name ?? '',
      category: this.detailsForm.value.category ?? '',
      price: this.detailsForm.value.price ?? 0,
      image: this.detailsForm.value.image ?? '',
      description: this.detailsForm.value.description ?? '',
    };

    this.store.dispatch(ProductActions.updateProduct({ product }));
  }

  cancelEdits(): void {
    this.router.navigateByUrl('/products');
  }
}
