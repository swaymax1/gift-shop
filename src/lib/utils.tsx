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
