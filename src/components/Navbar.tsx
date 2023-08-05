import { Link } from "react-router-dom";
import { BsGiftFill } from "react-icons/bs";
import { AiOutlineUser, AiOutlineHeart, AiOutlineLogout } from "react-icons/ai";
import SignInModal from "./SignIn";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  logout,
  setSignInModalOff,
  setSignInModalOn,
  setSignUpModalOff,
} from "../redux/authSlice";
import SignUpModal from "./SignUp";
import { useState } from "react";

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const [utilsList, setUtilsList] = useState(false);
  const totalQuantity = useSelector(
    (state: RootState) => state.productReducer.totalQuantity
  );
  const signInModalOn = useSelector(
    (state: RootState) => state.authReducer.signInModalOn
  );
  const signUpModalOn = useSelector(
    (state: RootState) => state.authReducer.signUpModalOn
  );
  const currentUser = useSelector(
    (state: RootState) => state.authReducer.currentUser
  );

  return (
    <nav className="flex justify-between bg-gray-700 p-6 w-full">
      <div className="flex items-center flex-shrink-0 mr-4">
        <Link to="/" className="font-semibold text-2xl tracking-tight">
          <i>YourGifts</i>
        </Link>
      </div>
      <div className="flex items-center">
        <button className="" onClick={() => {}}>
          <div
            className="flex justify-center items-center mr-6"
            onClick={() => {
              if (utilsList) {
                setUtilsList(false);
                return;
              }
              if (currentUser != null) {
                setUtilsList(true);
              } else {
                dispatch(setSignInModalOn());
              }
            }}
          >
            <AiOutlineUser className="md:text-2xl text-xl" />
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 20 20"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </button>
        <Link to="/cart" className="flex items-center text-white text-sm">
          <BsGiftFill color="red" className="md:text-2xl text-xl" />
          <sup className="ml-1 font-bold text-sm">
            {totalQuantity > 0 && totalQuantity}
          </sup>
        </Link>
        {utilsList && (
          <div className="absolute top-14 right-20 w-32 bg-slate-600 rounded-md shadow-sm">
            <ul className="py-2">
              <Link to="/favorites" onClick={() => setUtilsList(false)}>
                <li className="px-4 py-2 cursor-pointer hover:text-red-600 ">
                  <AiOutlineHeart className="inline" /> Favorites
                </li>
              </Link>
              <li
                className="px-4 py-2 cursor-pointer hover:text-red-600"
                onClick={() => {
                  dispatch(logout());
                  setUtilsList(false);
                }}
              >
                <AiOutlineLogout className="inline" /> Logout
              </li>
            </ul>
          </div>
        )}
        <SignInModal
          isOpen={signInModalOn}
          onRequestClose={() => dispatch(setSignInModalOff())}
        />
        <SignUpModal
          isOpen={signUpModalOn}
          onRequestClose={() => dispatch(setSignUpModalOff())}
        />
      </div>
    </nav>
  );
}
