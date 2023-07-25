import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProductView from "./components/ProductView";
import store, { AppDispatch, RootState } from "./redux/store";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import ProductsList from "./components/ProductsList";
import { useEffect } from "react";
import { getNextProducts, setTotalQuantity } from "./redux/productSlice";

function Layout({ children }: { children: React.ReactNode }) {

  const dispatch = useDispatch<AppDispatch>();
  const box = useSelector((state: RootState) => state.appReducer.box);

  useEffect(() => {
    dispatch(getNextProducts());
  }, []);

  useEffect(() => {
    localStorage.setItem("box", JSON.stringify(box));
    dispatch(setTotalQuantity());
  }, [box]);

  return (
    <>
      <Navbar />
      {children}
    </>
  );

  
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" Component={ProductsList} />
          <Route path="/products/:id" Component={ProductView} />
          <Route path="/cart" Component={Cart} />
        </Routes>
      </Layout>
    </Router>
  </Provider>
);
