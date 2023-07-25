import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectError, selectLoading } from "../redux/authSlice";
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
      className="rounded-lg p-6 fixed top-32 left-96 w-5/12 h-4/5"
    >
      <div className="bg-zinc-800 p-6 rounded-lg">
        <p className="text-red-700 mb-3">{error}</p>
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-400 p-2 w-full"
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
              id="password"
              className="border border-gray-400 p-2 w-full"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-400 disabled:bg-blue-400 disabled:opacity-50"
            disabled={!email || !password || loading}
          >
            Sign In
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default SignInModal;
