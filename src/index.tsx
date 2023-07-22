import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProductView from "./components/ProductView";
import store from "./redux/store";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";

function Layout({ children }: { children: React.ReactNode }) {
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
          <Route path="/" Component={App} />
          <Route path="/products/:id" Component={ProductView} />
          <Route path="/cart" Component={Cart} />
        </Routes>
      </Layout>
    </Router>
  </Provider>
);
