import { useDispatch } from "react-redux";
import { getProductTotalAmount } from "../lib/utils";
import { AppDispatch } from "../redux/store";
import { Product, ProductInBox } from "../types";
import Selector from "./Selector";
import { setProductInBoxQuantity } from "../redux/productSlice";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

interface Props {
  productInBox: ProductInBox;
  handleRemoveFromBox: () => void;
}

export default function ProductInBoxCard({
  productInBox,
  handleRemoveFromBox,
}: Props) {
  const totalAmount = getProductTotalAmount(productInBox);
  const [quantity, setQuantity] = useState(productInBox.quantity);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      setProductInBoxQuantity({ id: productInBox.product.id, newQty: quantity })
    );
  }, [quantity]);

  return (
    <div className="mb-4 flex flex-col items-center border-b p-4 mx-auto w-10/12 border-gray-300 md:flex-row md:justify-center">
      <img
        src={productInBox.product.image}
        alt={productInBox.product.name}
        className="h-32 w-32 object-cover mb-4 md:h-52 md:w-52 "
      />
      <h2 className="text-lg md:hidden">{productInBox.product.name}</h2>
      <div className="flex justify-between mt-5 md:flex-col md:items-center ml-10">
        <Selector quantity={productInBox.quantity} setQuantity={setQuantity} />
        <div className="flex flex-col items-center justify-between">
          <span className="ml-5 md:ml-0 md:mt-5">Total amount</span>
          <span className="font-bold">
            <sup>$</sup>
            {totalAmount}
          </span>
        </div>
      </div>
      <div
        className="text-red-700 ml-6 mb-12 mt-4 text-2xl md:mt-0"
        onClick={() => handleRemoveFromBox()}
      >
        <AiOutlineDelete />
      </div>
    </div>
  );
}
