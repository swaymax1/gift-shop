import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeFromBox } from "../redux/productSlice";
import ProductInBoxCard from "./ProductInBoxCard";
import { Link } from "react-router-dom";

const GiftsBox = () => {
  const dispatch = useDispatch();
  const box = useSelector((state: RootState) => state.productReducer.box);

  return (
    <div className="mt-10">
      <h1 className="text-2xl md:text-4xl font-semibold mb-4 ml-4 font-serif text-gray-100">
        Cart
      </h1>
      {box.length > 0 ? (
        <div className="text-center">
          {box.map((productInBox) => (
            <ProductInBoxCard
              handleRemoveFromBox={() => dispatch(removeFromBox(productInBox))}
              productInBox={productInBox}
              key={productInBox.product.id}
            />
          ))}

          <Link to="/order">
            <button className="bg-red-600 rounded w-9/12 md:w-5/12 md:h-12 py-2 px-4 font-semibold mb-10">
              Place Order
            </button>
          </Link>
        </div>
      ) : (
        <p className="fixed left-1/3 md:left-1/2 top-1/2">Cart is empty.</p>
      )}
    </div>
  );
};

export default GiftsBox;
