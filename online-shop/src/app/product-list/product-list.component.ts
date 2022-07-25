import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Product } from '../data/product';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { AppState } from '../state/app.state';
import * as ProductActions from '../state/products/product.actions';
import * as ProductSelectors from '../state/products/product.selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$ = this.store.select(ProductSelectors.selectProducts);
  canEditProducts = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ProductActions.getProducts());
    this.canEditProducts = this.authService.userHasRole('admin');
  }

  addProduct(): void {
    this.router.navigateByUrl('/add-product');
  }

  getProducts(): void {
    // this.productService.getProducts().subscribe((products) => {
    //   this.products = products;
    // });
  }

  deleteProduct(productId: number): void {
    // this.productService.deleteProduct(productId).subscribe(() => {
    //   this.productService.getProducts().subscribe((products) => {
    //     this.products = products;
    //     alert(`Deleted product with id = ${productId}`);
    //   });
    // });
  }
}
