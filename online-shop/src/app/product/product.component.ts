import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { }
  
  ngOnInit(): void {
    this.getProduct();
  }
  
  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProduct(id).subscribe(product => {
      this.product = product;
    });
  }
  
  addToCart(): void {
    alert('Product added to cart!');
  }
}
