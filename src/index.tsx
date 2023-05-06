import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProductView from "./components/ProductView";
import store from './reducers/store';
import Cart from "./components/Cart";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <Router>
    <Routes>
      <Route path="/" Component={App} />
      <Route path="/products/:id" Component={ProductView} />
      <Route path="/cart" Component={Cart} />
    </Routes>
  </Router>
  </Provider>
);
