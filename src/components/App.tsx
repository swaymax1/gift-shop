import { useEffect, useState } from "react";
import { Product } from "../types";
import { Spinner } from "react-bootstrap";
import ProductItem from "./ProductItem";
import ProductsList from "./ProductsList";
import Navbar from "./Navbar";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json))
      .then(() => setLoading(false));
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
