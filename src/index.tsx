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
import { getNextProducts, setTotalPrice, setTotalQuantity } from "./redux/productSlice";
import OrderDetails from "./components/OrderDetails";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function Layout({ children }: { children: React.ReactNode }) {

  const dispatch = useDispatch<AppDispatch>();
  const box = useSelector((state: RootState) => state.productReducer.box);

  useEffect(() => {
    dispatch(getNextProducts());
  }, []);

  useEffect(() => {
    localStorage.setItem("box", JSON.stringify(box));
    dispatch(setTotalQuantity());
    dispatch(setTotalPrice());
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
          <Route path="/order" Component={OrderDetails}/>
        </Routes>
      </Layout>
    </Router>
    <ToastContainer />
  </Provider>
);
