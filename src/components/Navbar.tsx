import { Link } from "react-router-dom";
import { BsGiftFill } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import SignInModal from "./SignIn";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useState } from "react";

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const totalQuantity = useSelector(
    (state: RootState) => state.appReducer.totalQuantity
  );
  const [signInModalOn, setSignInModal] = useState(false);

  return (
    <nav className="flex justify-between bg-gray-700 p-6 w-full">
      <div className="flex items-center flex-shrink-0 text-white mr-4">
        <Link
          to="/"
          className="font-semibold text-xl tracking-tight lg:text-2xl"
        >
          <i>Your gifts</i>
        </Link>
      </div>
      <div className="flex items-center">
        <Link to="/cart" className="flex items-center text-white mr-6 text-sm">
          <sup className="mr-1 font-bold text-sm">
            {totalQuantity > 0 && totalQuantity}
          </sup>
          <BsGiftFill color="red" className="md:text-2xl text-xl" />
        </Link>
        <button
          className=""
          onClick={() => {
            setSignInModal(true);
          }}
        >
          <AiOutlineUser className="md:text-2xl text-xl " />
        </button>
        <SignInModal
          isOpen={signInModalOn}
          onRequestClose={() => setSignInModal(false)}
        />
      </div>
    </nav>
  );
}
