import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from '../data/product';
import { AppState } from '../state/app.state';
import { selectLoggedInUser } from '../state/login/login.selectors';
import { addProductToCart, getProduct } from '../state/products/product.actions';
import { selectSelectedProduct } from '../state/products/product.selectors';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  product: Product = { id: -1, name: '', category: '', price: 0, image: '', description: '' };
  canEditProduct = false;
  canAddToCart = false;

  selectedProduct$ = this.store.select(selectSelectedProduct);
  loggedInUser$ = this.store.select(selectLoggedInUser);

  selectedProductSubscription = new Subscription();
  loggedInUserSubscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const productId = parseInt(this.route.snapshot.paramMap.get('id') ?? '', 10);
    this.store.dispatch(getProduct({ productId }));

    this.selectedProductSubscription = this.selectedProduct$.subscribe((product) => {
      if (product) {
        this.product = product;
      }
    });
    this.loggedInUserSubscription = this.loggedInUser$.subscribe((user) => {
      if (user) {
        this.canEditProduct = user.roles.includes('admin');
        this.canAddToCart = user.roles.includes('customer');
      }
    });
  }

  ngOnDestroy(): void {
    this.selectedProductSubscription.unsubscribe();
    this.loggedInUserSubscription.unsubscribe();
  }

  editProduct(): void {
    if (this.product.id !== -1) {
      this.router.navigate(['/edit-product', this.product.id]);
    }
  }

  addToCart(): void {
    if (this.product.id !== -1) {
      this.store.dispatch(addProductToCart({ productId: this.product.id }));
      alert('Product added to cart');
    }
  }
}
