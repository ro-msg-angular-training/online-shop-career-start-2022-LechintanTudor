import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { EditProductFormComponent } from './edit-product-form/edit-product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './state/products/product.reducer';
import { ProductEffects } from './state/products/product.effects';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListComponent,
    PageNotFoundComponent,
    ShoppingCartComponent,
    EditProductFormComponent,
    AddProductFormComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ products: productReducer }),
    EffectsModule.forRoot([ProductEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
