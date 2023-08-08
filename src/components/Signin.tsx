import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  selectError,
  selectLoading,
  setSignUpModalOn,
} from "../redux/authSlice";
import { AppDispatch } from "../redux/store";
import Modal from "react-modal";

interface Props {
  isOpen: boolean;
  onRequestClose: any;
}

Modal.setAppElement("#root");

const SignInModal = ({ isOpen, onRequestClose }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch<AppDispatch>();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="rounded-lg p-6 fixed top-20 left-10 w-10/12 h-fit bg-zinc-800 md:left-1/3 md:w-4/12 md:top-32"
    >
      <p className="text-red-600 mb-3">{error}</p>
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="border bg-gray-100 text-black p-2 w-full"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="border bg-gray-100 text-black p-2 w-full"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button
          type="submit"
          className="bg-red-600 text-white py-2 px-4 rounded w-full disabled:opacity-50"
          disabled={!email || !password || loading}
        >
          Sign In
        </button>
        <div
          className="mt-3 text-gray-100"
          onClick={() => {
            dispatch(setSignUpModalOn());
          }}
        >
          Don't have an account? <b className="text-blue-300 cursor-pointer">Sign Up</b>
        </div>
      </form>
    </Modal>
  );
};

export default SignInModal;
