import { useEffect } from "react";
import ProductsList from "./ProductsList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  getNextProducts, setTotalQuantity,
} from "../redux/appReducer";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getNextProducts());
    dispatch(setTotalQuantity());
  }, []);

  return (
    <>
      <ProductsList />
    </>
  );
}

export default App;
