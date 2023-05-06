import { Product, ProductInBox } from "../types";

interface Props {
  productInBox: ProductInBox;
  handleRemoveFromBox: (product: Product) => void;
}

export default function ProductInBoxCard({
  productInBox,
  handleRemoveFromBox,
}: Props) {
  return (
    <div className="mb-4 border p-4">
      <div className="flex">
        <img
          src={productInBox.product.image}
          alt={productInBox.product.name}
          className="h-20 w-20 object-cover mr-4"
        />
        <div>
          <h2 className="text-lg font-bold mb-2">
            {productInBox.product.name}
          </h2>
          <p className="text-gray-700 mb-2">
            {productInBox.product.description}
          </p>
          <p className="font-bold">${productInBox.product.price}</p>
          <p className="font-bold">Quantity: {productInBox.quantity}</p>
          <button
            className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded mt-2"
            onClick={() => handleRemoveFromBox(productInBox.product)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
