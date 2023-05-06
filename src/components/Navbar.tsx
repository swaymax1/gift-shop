import { Link } from "react-router-dom";
import { BsGiftFill } from "react-icons/bs";
import SignInModal from "./SignIn";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../reducers/store";
import {
  setIsSignInModalShown,
  selectSignInModal,
  selectSignUpModal,
} from "../reducers/appReducer";

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const isSignInModalShown = useSelector(selectSignInModal);
  const isSignUpModalShown = useSelector(selectSignUpModal);

  return (
    <nav className="flex items-center justify-between bg-gray-700 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/" className="font-semibold text-xl tracking-tight">
          <BsGiftFill className="w-12 h-10 text-red-600" />
        </Link>
      </div>
      <div className="w-full block lg:flex lg:items-center lg:w-auto">
        <Link
          to="/cart"
          className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-red-600 mr-4"
        >
          Gift Box
        </Link>
        <Link
          to="/contact-us"
          className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-red-600"
        >
          Contact Us
        </Link>
        <button
          className="block m-3"
          onClick={() => dispatch(setIsSignInModalShown(true))}
        >
          Sign in
        </button>
        <SignInModal />
      </div>
    </nav>
  );
}
