import { LoginState } from './login/login.reducer';
import { ProductState } from './products/product.reducer';

export interface AppState {
  login: LoginState;
  products: ProductState;
}
