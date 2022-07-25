import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
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

  goToAddProductForm(): void {
    this.router.navigateByUrl('/add-product');
  }

  deleteProduct(productId: number): void {
    this.store.dispatch(ProductActions.deleteProduct({ productId }));
  }
}
