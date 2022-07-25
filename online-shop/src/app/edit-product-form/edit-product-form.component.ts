import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Product } from '../data/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.scss'],
})
export class EditProductFormComponent implements OnInit {
  productId = -1;
  detailsForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    image: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productId = parseInt(this.route.snapshot.paramMap.get('id') ?? '', 10);

    this.productService
      .getProduct(this.productId)
      .pipe(take(1))
      .subscribe((product) => this.detailsForm.patchValue(product));
  }

  applyEdits(): void {
    const product: Product = {
      id: this.productId,
      name: this.detailsForm.value.name ?? '',
      category: this.detailsForm.value.category ?? '',
      price: this.detailsForm.value.price ?? 0,
      image: this.detailsForm.value.image ?? '',
      description: this.detailsForm.value.description ?? '',
    };

    this.productService.updateProduct(product).subscribe({
      next: () => {
        alert('Product updated successfully!');
        this.location.back();
      },
      error: () => {
        alert('Failed to update product');
      },
    });
  }

  cancelEdits(): void {
    this.location.back();
  }
}
