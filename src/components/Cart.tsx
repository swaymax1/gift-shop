import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeFromBox } from "../redux/productSlice";
import { Product } from "../types";
import ProductInBoxCard from "./ProductInBoxCard";
import { Link } from "react-router-dom";

const GiftsBox = () => {
  const dispatch = useDispatch();
  const box = useSelector((state: RootState) => state.productReducer.box);

  const handleRemoveFromBox = (product: Product) => {
    dispatch(removeFromBox(product));
  };

  return (
    <div className="absolute top-36 mx-auto min-w-[30rem]">
      <h1 className="text-2xl font-bold mb-4">Gifts Box</h1>
      {box.length > 0 ? (
        <div>
          {box.map((productInBox) => (
            <ProductInBoxCard
              handleRemoveFromBox={handleRemoveFromBox}
              productInBox={productInBox}
              key={productInBox.product.id}
            />
          ))}
          <button
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            <Link to="/order">Place Order</Link>
          </button>
        </div>
      ) : (
        <p className="text-gray-700">Gifts box is empty.</p>
      )}
    </div>
  );
};

export default GiftsBox;
