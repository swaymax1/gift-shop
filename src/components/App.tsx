import { useEffect } from "react";
import ProductsList from "./ProductsList";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { Spinner } from "react-bootstrap";
import {
  getNextProducts,
  selectProducts,
  selectLoading,
} from "../reducers/appReducer";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../services/firebase";

function App() {
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getNextProducts());
  }, []);

  if (loading) return <Spinner />;
  return (
    <>
      <Navbar />
      <ProductsList products={products} />
    </>
  );
}

export default App;
