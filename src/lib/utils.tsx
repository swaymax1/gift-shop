import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Product, ProductInBox } from "../types";
import { db } from "../services/firebase";

export function getFirebaseErrorMessageFromCode(errorCode: string): string {
  switch (errorCode) {
    case "auth/user-not-found":
      return "User not found.";
    case "auth/wrong-password":
      return "Invalid password.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/email-already-in-use":
      return "Email address is already in use.";
    case "auth/weak-password":
      return "Password is too weak.";
    default:
      return "Something went wrong.";
  }
}

export function getBoxFromLocalStorage(): ProductInBox[] | null {
  let box: ProductInBox[] | null = JSON.parse(
    localStorage.getItem("box") || "[]"
  );
  return box;
}

export function createProductFromDoc(doc: DocumentData): Product {
  const product: Product = {
    id: doc.get("id"),
    name: doc.get("name"),
    description: doc.get("description"),
    image: doc.get("image"),
    price: doc.get("price"),
  };
  return product;
}

export async function getProductById(id: number): Promise<Product | undefined> {
  const productsRef = collection(db, "products");
  const snapshot = await getDocs(query(productsRef, where("id", "==", id)));
  if (!snapshot.size) return;
  return createProductFromDoc(snapshot.docs[0]);
}

export function getNumberOfItems(box : ProductInBox[]) {
  let sum = 0;
  for(let product of box) {
    sum += product.quantity;
  }
  return sum;
}

export function getProductTotalAmount(product: ProductInBox) {
  return product.quantity * product.product.price;
}

export function getTotalAmont(box: ProductInBox[]) {
  let total = 0;
  for(let product of box) {
    total += getProductTotalAmount(product);
  }
  return total;
}