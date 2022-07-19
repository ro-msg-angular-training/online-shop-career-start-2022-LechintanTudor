import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../data/order';
import { Product } from '../data/product';
import { API_BASE_URL } from './common';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  orders: Order[] = [];

  constructor(private http: HttpClient) {}
  
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_BASE_URL}/products`);
  }
  
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_BASE_URL}/products/${id}`);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/products/${id}`);
  }
  
  addToCart(productId: number): void {
    let order = this.orders.find(order => order.productId === productId);

    if (order !== undefined) {
      order.quantity += 1;
    } else {
      this.orders.push({ productId, quantity: 1 });
    }
  }
  
  getOrders(): Order[] {
    return this.orders;
  }
  
  checkout() {
    const data = { customer: 'doej', products: this.orders };

    return this.http.post(`${API_BASE_URL}/orders`, data, { responseType: 'text' });
  }
}
