import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../state/app.state';
import { selectLoggedInUser } from '../state/login/login.selectors';
import { deleteProduct, getProducts } from '../state/products/product.actions';
import { selectProducts } from '../state/products/product.selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  canEditProducts = false;

  products$ = this.store.select(selectProducts);
  loggedInUser$ = this.store.select(selectLoggedInUser);

  loggedInUserSubscription = new Subscription();

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loggedInUserSubscription = this.loggedInUser$.subscribe((user) => {
      this.canEditProducts = user?.roles.includes('admin') ?? false;
    });

    this.store.dispatch(getProducts());
  }

  ngOnDestroy(): void {
    this.loggedInUserSubscription.unsubscribe();
  }

  goToAddProductForm(): void {
    this.router.navigateByUrl('/add-product');
  }

  deleteProduct(productId: number): void {
    this.store.dispatch(deleteProduct({ productId }));
  }
}
