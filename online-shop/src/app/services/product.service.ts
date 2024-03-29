import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from '../data/order';
import { Product } from '../data/product';
import { API_BASE_URL } from './common';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${API_BASE_URL}/products`, product);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_BASE_URL}/products`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_BASE_URL}/products/${id}`);
  }

  updateProduct(product: Product): Observable<void> {
    return this.http.put<void>(`${API_BASE_URL}/products/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/products/${id}`);
  }

  checkout(username: string, orders: Order[]): Observable<void> {
    const data = { customer: username, products: orders };

    return this.http
      .post(`${API_BASE_URL}/orders`, data, {
        responseType: 'text',
      })
      .pipe(map(() => {}));
  }
}
