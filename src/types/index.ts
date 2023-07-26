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

export interface ProductState {
  products: Product[],
  box: ProductInBox[],
  lastProduct: DocumentData | null,
  error: string | null,
  hasMoreProducts: boolean,
  totalQuantity: number,
}

export interface OrderState {
  order: Order | null,
}

export interface ProductInBox {
  product: Product,
  quantity: number,
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Order {
  products: ProductInBox[],
  customerDetails: CustomerDetails,
}

export interface CustomerDetails {
  name: String,
  city: String,
  phoneNumber: String,
}

