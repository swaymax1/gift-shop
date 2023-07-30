import { useState } from "react";
import Modal from "react-modal";
import { Order } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { placeOrder } from "../redux/orderSlice";

export default function OrderDetails() {
  const products = useSelector((state: RootState) => state.productReducer.box);
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let val = event.target.value;
    setPhoneNumber(val);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleStreetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name.length < 7) {
      setError("Enter full Name");
      return;
    }
    if (city.length < 3) {
      setError("Enter City");
      return;
    }
    if (!phoneNumber.match("")) { 
      setError("Invalid Phone Number");
      return;
    }
    const order: Order = {
      customerDetails: {
        name,
        city,
        phoneNumber,
      },
      products,
    };
    dispatch(placeOrder(order));
  };

  return (
    <div className="p-6 fixed top-24 mx-auto w-9/12">
      <h1 className="text-2xl mb-4 font-semibold">Order Details</h1>
      <form onSubmit={handleFormSubmit}>
        <h2 className="text-red-600 mb-4 font-semibold text-xl">
          {error && error}
        </h2>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="bg-gray-700 w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={handlePhoneChange}
            className="bg-gray-700 w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block mb-2">
            City
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={handleCityChange}
            className="bg-gray-700 w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="street" className="block mb-2">
            Street Address
          </label>
          <input
            type="text"
            id="street"
            value={street}
            onChange={handleStreetChange}
            className="bg-gray-700 w-full p-2"
          />
        </div>
        <div className="mb-4">
          <span className="text-xl">Total Amount</span>
          <span className="block font-bold">15$</span>
        </div>
        <button className="bg-red-700 w-full h-12 text-xl font-semibold font-serif active:bg-red-900 duration-75">
          Checkout
        </button>
      </form>
    </div>
  );
}
