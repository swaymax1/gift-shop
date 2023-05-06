import { ProductInBox } from "../types";

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
    localStorage.getItem("box") || ""
  );
  return box;
}

// async function upload() {
//   const ref = collection(db, "products");
//   data.map(async (product) => {
//     const imageRef = imRef(storage, `images/${product.id}.jpg`);
//     const url = await getDownloadURL(imageRef);
//     addDoc(ref, {
//       id: product.id,
//       name: product.name,
//       description: product.description,
//       price: product.price,
//       image: url.toString(),
//     });
//   });
// }
