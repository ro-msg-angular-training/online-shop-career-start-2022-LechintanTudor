import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from '../data/product';
import { AppState } from '../state/app.state';
import * as ProductActions from '../state/products/product.actions';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss'],
})
export class AddProductFormComponent implements OnInit, OnDestroy {
  detailsForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    image: ['', Validators.required],
    description: ['', Validators.required],
  });

  addProductSuccessSubscription = new Subscription();
  addProductErrorSubscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private actions: Actions
  ) {}

  ngOnInit(): void {
    this.addProductSuccessSubscription = this.actions
      .pipe(ofType(ProductActions.addProductSuccess))
      .subscribe(({ product }) => {
        alert(`Added product with id=${product.id}!`);
        this.router.navigateByUrl('/products');
      });

    this.addProductErrorSubscription = this.actions
      .pipe(ofType(ProductActions.addProductError))
      .subscribe(() => alert('Failed to add product!'));
  }

  ngOnDestroy(): void {
    this.addProductSuccessSubscription.unsubscribe();
    this.addProductErrorSubscription.unsubscribe();
  }

  addProduct(): void {
    const product: Product = {
      id: -1,
      name: this.detailsForm.value.name ?? '',
      category: this.detailsForm.value.category ?? '',
      price: this.detailsForm.value.price ?? 0,
      image: this.detailsForm.value.image ?? '',
      description: this.detailsForm.value.description ?? '',
    };

    this.store.dispatch(ProductActions.addProduct({ product }));
  }

  cancel(): void {
    this.router.navigateByUrl('/products');
  }
}
