import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { removeFromBox } from "../reducers/appReducer";
import { Product } from "../types";
import ProductInBoxCard from "./ProductInBoxCard";

const GiftsBox = () => {
  const dispatch = useDispatch();
  const box = useSelector((state: RootState) => state.appReducer.box);

  const handleRemoveFromBox = (product: Product) => {
    dispatch(removeFromBox(product));
  };

  const handlePlaceOrder = () => {
    // handle placing the order
  };

  return (
    <div>
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
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      ) : (
        <p className="text-gray-700">Your gifts box is empty.</p>
      )}
    </div>
  );
};

export default GiftsBox;
