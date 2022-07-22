import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Order } from '../data/order';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  orders: Order[] = [];
  canCheckout = false;

  constructor(private productService: ProductService, private authService: AuthService) {}

  ngOnInit(): void {
    this.orders = this.productService.getOrders();
    this.canCheckout = this.orders.length !== 0 && this.authService.userHasRole('customer');
  }

  checkout(): void {
    this.productService
      .checkout()
      .pipe(take(1))
      .subscribe(() => alert('Completed checkout!'));
  }
}
