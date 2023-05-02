import { User } from "firebase/auth";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface AuthState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

export interface AppState {
  isSignInModalShown: boolean,
  isSignUpModalShown: boolean,
}

export interface loginCredentials {
  email: string,
  password: string,
}