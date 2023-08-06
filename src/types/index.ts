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
  signInModalOn: boolean;
  signUpModalOn: boolean;
  favorites: Product[];
}

export interface ProductState {
  products: Product[];
  box: ProductInBox[];
  lastProduct: DocumentData | null;
  error: string | null;
  hasMoreProducts: boolean;
  totalQuantity: number;
  totalPrice: number;
  addToBoxCompleted: boolean;
  loading: boolean;
}

export interface OrderState {
  order: Order | null;
  addingOrder: boolean;
  orderPlaced: boolean;
}

export interface ProductInBox {
  product: Product;
  quantity: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Order {
  id: String,
  products: ProductInBox[];
  customerDetails: CustomerDetails;
  totalPrice: number;
  date: number;
  pending: boolean;
}

export interface CustomerDetails {
  name: String;
  city: String;
  phoneNumber: String;
}
