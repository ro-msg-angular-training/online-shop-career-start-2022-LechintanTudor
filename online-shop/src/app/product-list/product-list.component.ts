import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from '../data/product';
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
  @ViewChild(MatTable) productTable!: MatTable<Product>;
  columnsToDisplay = ['id', 'name', 'category', 'price', 'details', 'delete'];

  products: Product[] = [];
  canEditProducts = false;

  products$ = this.store.select(selectProducts);
  loggedInUser$ = this.store.select(selectLoggedInUser);

  productsSubscription = new Subscription();
  loggedInUserSubscription = new Subscription();

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.productsSubscription = this.products$.subscribe((products) => {
      this.products = products;
      // this.productTable.renderRows();
    });
    this.loggedInUserSubscription = this.loggedInUser$.subscribe((user) => {
      this.canEditProducts = user?.roles.includes('admin') ?? false;
    });

    this.store.dispatch(getProducts());
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
    this.loggedInUserSubscription.unsubscribe();
  }

  goToAddProductForm(): void {
    this.router.navigateByUrl('/add-product');
  }

  deleteProduct(productId: number): void {
    this.store.dispatch(deleteProduct({ productId }));
  }
}
