import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';
import { EditProductFormComponent } from './edit-product-form/edit-product-form.component';
import { AuthGuard } from './guards/auth.guard';
import { CustomerAuthGuard } from './guards/customer-auth.guard';
import { LoginFormComponent } from './login-form/login-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', component: ProductComponent },
      { path: 'add-product', component: AddProductFormComponent },
      { path: 'edit-product/:id', component: EditProductFormComponent },
      { path: 'shopping-cart', canActivate: [CustomerAuthGuard], component: ShoppingCartComponent },
      { path: '', pathMatch: 'full', redirectTo: '/products' },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
