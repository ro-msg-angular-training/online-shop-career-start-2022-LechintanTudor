import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../state/app.state';
import { selectLoggedInUser } from '../state/login/login.selectors';
import { checkoutCart } from '../state/products/product.actions';
import { selectOrders } from '../state/products/product.selectors';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  canCheckout = false;

  orders$ = this.store.select(selectOrders);
  loggedInUser$ = this.store.select(selectLoggedInUser);

  loggedInUserSubscription = new Subscription();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loggedInUserSubscription = this.loggedInUser$.subscribe((user) => {
      this.canCheckout = user?.roles.includes('customer') ?? false;
    });
  }

  ngOnDestroy(): void {
    this.loggedInUserSubscription.unsubscribe();
  }

  checkout(): void {
    this.store.dispatch(checkoutCart());
  }
}
