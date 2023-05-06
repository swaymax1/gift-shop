import { useEffect } from "react";
import ProductsList from "./ProductsList";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../reducers/store";
import {
  getNextProducts,
  selectProducts,
} from "../reducers/appReducer";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getNextProducts());
  }, []);

  return (
    <>
      <Navbar />
      <ProductsList />
    </>
  );
}

export default App;
