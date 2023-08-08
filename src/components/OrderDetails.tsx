import { useState, useEffect } from "react";
import { Order } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { placeOrder, setOrderPlacedFalse } from "../redux/orderSlice";
import { TailSpin } from "react-loader-spinner";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Guid } from "guid-typescript";


export default function OrderDetails() {
  const products = useSelector((state: RootState) => state.productReducer.box);
  const totalPrice = useSelector(
    (state: RootState) => state.productReducer.totalPrice
  );
  const addingOrder = useSelector(
    (state: RootState) => state.orderReducer.addingOrder
  );
  const orderPlaced = useSelector(
    (state: RootState) => state.orderReducer.orderPlaced
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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

  useEffect(() => {
    if (orderPlaced) {
      Swal.fire({
        icon: "success",
        title: "Order Placed!",
        text: "We will be in touch with you soon",
        confirmButtonText: "OK",
        background: "#374151",
        color: "white",
        confirmButtonColor: "green",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
          dispatch(setOrderPlacedFalse());
        }
      });
    }
  }, [orderPlaced]);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (addingOrder) return;
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
      id: Guid.create().toString(),
      customerDetails: {
        name,
        city,
        phoneNumber,
      },
      products,
      totalPrice: totalPrice,
      date: Date.now(),
      pending: true,
    };
    dispatch(placeOrder(order));
  };

  return (
    <div className="mt-14 w-9/12 md:w-5/12 mx-auto">
      <sup className="flex absolute left-2 top-28 md:left-[50rem]">
        <span className="font-semibold">Delivery to all lebanon</span>
        <img
          src="https://cdn.countryflags.com/thumbs/lebanon/flag-800.png"
          className="w-5 h-5 relative bottom-3 left-3"
          alt="order"
        />
      </sup>
      <h1 className="font-semibold text-gray-100 text-2xl font-serif mb-10">
        Customer Details
      </h1>
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
          <span className="block font-bold">{totalPrice}$</span>
        </div>
        <button className="bg-red-700 w-full h-12 text-xl font-semibold font-serif active:bg-red-900 duration-75">
          {addingOrder ? (
            <TailSpin
              color="black"
              width={40}
              height={40}
              wrapperStyle={{
                position: "relative",
                left: "50%",
              }}
            />
          ) : (
            "Checkout"
          )}
        </button>
      </form>
    </div>
  );
}
