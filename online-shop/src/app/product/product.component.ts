import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Product } from '../data/product';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '-----',
    category: '-----',
    price: 0,
    image: '',
    description: '-----',
  };

  canEditProduct = this.authService.userHasRole('admin');
  canAddToCart = this.authService.userHasRole('customer');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id') ?? '', 10);

    this.productService
      .getProduct(id)
      .pipe(take(1))
      .subscribe((product) => {
        this.product = product;
      });
  }

  editProduct(): void {
    this.router.navigate(['/edit-product', this.product.id]);
  }

  addToCart(): void {
    this.productService.addToCart(this.product.id);
    alert('Product added to cart');
  }
}
