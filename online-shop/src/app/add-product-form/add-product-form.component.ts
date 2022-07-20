import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from '../data/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss'],
})
export class AddProductFormComponent {
  detailsForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    image: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private productService: ProductService
  ) {}

  addProduct(): void {
    const product: Product = {
      id: -1,
      name: this.detailsForm.value.name ?? '',
      category: this.detailsForm.value.category ?? '',
      price: Number(this.detailsForm.value.price ?? 0),
      image: this.detailsForm.value.image ?? '',
      description: this.detailsForm.value.description ?? '',
    };

    this.productService.addProduct(product).subscribe({
      next: (product) => {
        alert(`Successfully added product with id=${product.id}`);
        this.location.back();
      },
      error: () => {
        alert(`Failed to add product`);
      },
    });
  }

  cancel(): void {
    this.location.back();
  }
}
