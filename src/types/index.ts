import { User } from "firebase/auth";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface AuthState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

export interface AppState {
  isSignInModalShown: boolean;
  isSignUpModalShown: boolean;
  products: Product[],
  box: ProductInBox[],
}

export interface ProductInBox {
  product: Product,
  quantity: number,
}

export interface loginCredentials {
  email: string;
  password: string;
}
