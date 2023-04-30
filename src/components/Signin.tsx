import { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { login } from "../reducers/authReducer";
import { AppDispatch } from "../store";

Modal.setAppElement("#root");

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal = ({ isOpen, onClose }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login({email, password}));
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
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
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
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
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400"
            disabled={!password || !email}
          >
            Sign In
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default SignInModal;
