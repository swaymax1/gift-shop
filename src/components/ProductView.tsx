import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Product, ProductInBox } from "../types";
import Select from "react-select";
import { selectProducts } from "../reducers/appReducer";
import { AppDispatch } from "../reducers/store";
import { addToBox } from "../reducers/appReducer";

const quantityOptions = new Array(5)
  .fill(0)
  .map((_, i) => ({ value: i + 1, label: i + 1 }));

export default function ProductView() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState<number>(1);
  const products = useSelector(selectProducts);
  const product = products.find((product) => product.id === Number(id));
  const dispatch = useDispatch<AppDispatch>();

  const handleProductAdd = () => {
    const productToAdd: ProductInBox = { product: product!, quantity };
    dispatch(addToBox(productToAdd));
  };

  if (!product) return <div>Something went wrong!</div>;
  return (
    <div className="flex flex-row absolute left-7 top-7">
      <img
        src={product.image}
        alt={product.name}
        className=""
        style={{ width: "400px", height: "500px" }}
      />
      <div className="flex flex-col relative top-16 left-5">
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <span className="font-bold text-lg">${product.price}</span>
        <Select
          options={quantityOptions}
          placeholder="Quantity"
          defaultValue={quantityOptions[0]}
          className="w-20 mt-4"
          onChange={(value) => setQuantity(value?.value || 1)}
        />
        <p className="text-gray-600 mt-4">{product.description}</p>
        <button
          onClick={() => handleProductAdd()}
          className="bg-red-600 relative top-40 text-white px-4 py-2 rounded h-12 active:scale-95"
        >
          Add To Gift Box
        </button>
        <button
          onClick={() => {}}
          className="bg-blue-600 relative top-40 mt-3 text-white px-4 py-2 rounded h-12 active:scale-95"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

// const product: Product = {
//   description:
//     "Check your makeup on the go with this cute Hello Kitty mirror.",
//   id: 9,
//   image:
//     "https://firebasestorage.googleapis.com/v0/b/gift-shop-4bf1f.appspot.com/o/images%2F9.jpg?alt=media&token=62169e0c-8202-4ca4-8e42-ad777f4bc9b0",
//   name: "Hello kitty mirror",
//   price: 17,
// };
