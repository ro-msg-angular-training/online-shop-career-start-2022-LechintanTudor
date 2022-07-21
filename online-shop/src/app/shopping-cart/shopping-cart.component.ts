import { Component, OnInit } from '@angular/core';
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
  canCheckout = this.authService.userHasRole('customer');

  constructor(private productService: ProductService, private authService: AuthService) {}

  ngOnInit(): void {
    this.orders = this.productService.getOrders();
    this.canCheckout &&= this.orders.length !== 0;
  }

  checkout(): void {
    this.productService.checkout().subscribe(() => alert('Completed checkout!'));
  }
}
