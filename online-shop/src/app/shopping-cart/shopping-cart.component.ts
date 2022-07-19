import { Component, OnInit } from '@angular/core';
import { Order } from '../data/order';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  orders: Order[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.orders = this.productService.getOrders();
  }

  checkout(): void {
    this.productService
      .checkout()
      .subscribe(() => alert('Completed checkout!'));
  }
}
