import { Component } from '@angular/core';
import { Product } from '../data/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products: Product[] = [
    { id: 1, name: 'Product 1', category: 'Category 1', price: 100, image: 'https://i.imgur.com/tOSAuTR.jpeg', description: 'Description 1' },
    { id: 2, name: 'Product 2', category: 'Category 2', price: 200, image: 'https://i.imgur.com/tOSAuTR.jpeg', description: 'Description 2' },
    { id: 3, name: 'Product 3', category: 'Category 3', price: 300, image: 'https://i.imgur.com/tOSAuTR.jpeg', description: 'Description 3' },
    { id: 4, name: 'Product 4', category: 'Category 4', price: 400, image: 'https://i.imgur.com/tOSAuTR.jpeg', description: 'Description 4' },
    { id: 5, name: 'Product 5', category: 'Category 5', price: 500, image: 'https://i.imgur.com/tOSAuTR.jpeg', description: 'Description 5' },
  ];
  
  constructor() { }
}
