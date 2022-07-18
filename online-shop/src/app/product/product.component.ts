import { Component, OnInit } from '@angular/core';
import { Product } from '../data/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  product: Product = {
    id: 1,
    name: 'My Product',
    category: 'My Category',
    price: 69420,
    image: 'https://media.wired.com/photos/5e1e646743940d0008009167/1:1/w_1533,h_1533,c_limit/Science_Cats-84873657.jpg',
    description: 'A very good product',
  };

  constructor() { }
}
