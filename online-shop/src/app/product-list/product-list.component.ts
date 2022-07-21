import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../data/product';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  canEditProducts: boolean = this.authService.userHasRole('admin');

  constructor(
    private router: Router,
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  addProduct(): void {
    this.router.navigateByUrl('/add-product');
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.productService.getProducts().subscribe((products) => {
        this.products = products;
        alert(`Deleted product with id = ${productId}`);
      });
    });
  }
}
