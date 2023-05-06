import { useEffect, useState } from "react";
import { Product } from "../types";
import ProductsList from "./ProductsList";
import Navbar from "./Navbar";
import { TailSpin } from "react-loader-spinner";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db, storage } from "../services/firebase";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { data } from "../lib/data";
import { getDownloadURL, ref as imRef } from "firebase/storage";
import { Spinner } from "react-bootstrap";
import { selectProducts, setProducts } from "../reducers/appReducer";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(selectProducts);

  async function getProducts() {
    const dataRef = collection(db, "products");
    const snapshot = await getDocs(query(dataRef));
    const fetchedProducts: Product[] = [];
    snapshot.forEach((doc) => {
      let product: Product = {
        name: doc.get("name"),
        description: doc.get("description"),
        id: doc.get("id"),
        price: doc.get("price"),
        image: doc.get("image"),
      };
      fetchedProducts.push(product);
    });
    dispatch(setProducts(fetchedProducts));
    setLoading(false);
  }

  useEffect(() => {
    getProducts();
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
