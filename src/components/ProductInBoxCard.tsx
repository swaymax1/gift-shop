import { getProductTotalAmount } from "../lib/utils";
import { Product, ProductInBox } from "../types";
import Selector from "./Selector";

interface Props {
  productInBox: ProductInBox;
  handleRemoveFromBox: (product: Product) => void;
}

export default function ProductInBoxCard({
  productInBox,
  handleRemoveFromBox,
}: Props) {

  const totalAmount = getProductTotalAmount(productInBox);

  return (
    <div className="mb-4 flex flex-col items-center border-b p-4 w-9/12">
      <img
        src={productInBox.product.image}
        alt={productInBox.product.name}
        className="h-32 w-32 object-cover mb-4"
      />
      <h2 className="text-lg">{productInBox.product.name}</h2>
      <div className="flex border border-red-400 items-start justify-between w-full mt-5">   
        <Selector quantity={productInBox.quantity} setQuantity={() => {}} />
      </div>
      <div className="flex flex-col items-center justify-between">
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
    </div>
  );
}

{
  /* <button
            className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded mt-2"
            onClick={() => handleRemoveFromBox(productInBox.product)}
          >
            Remove
</button> */
}
