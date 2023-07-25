import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";

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
  products: Product[],
  box: ProductInBox[],
  lastProduct: DocumentData | null,
  error: string | null,
  hasMoreProducts: boolean,
  totalQuantity: number,
}

export interface OrderState {
  order: order | null,
}

export interface ProductInBox {
  product: Product,
  quantity: number,
}

export interface loginCredentials {
  email: string;
  password: string;
}

export interface order {
  products: ProductInBox[],
  details: cutomerDetails,
}

export interface cutomerDetails {
  name: String,
  city: String,
  phoneNumber: number,
}

