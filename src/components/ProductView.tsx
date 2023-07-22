import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Product, ProductInBox } from "../types";
import { AppDispatch } from "../redux/store";
import { addToBox } from "../redux/appReducer";
import { getProductById } from "../lib/utils";
import Spinnner from "./Spinner";
import Selector from "./Selector";
import { BsGiftFill } from "react-icons/bs";

const desc = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore suscipit, voluptatem facere, soluta quod aliquid maiores voluptatibus distinctio reiciendis inventore saepe nostrum, nam magnam quam et iure ea quaerat vitae beatae? Accusamus, dolorum provident illum maxime sit ipsa quam voluptate, reiciendis mollitia corporis, sed eum laboriosam ratione cumque eveniet voluptatem?`;

const quantityOptions = new Array(5)
  .fill(0)
  .map((_, i) => ({ value: i + 1, label: i + 1 }));

const notFound = "Product not found!";

export default function ProductView() {
  const { id } = useParams();
  const [error, setError] = useState<string | null>(
    id === null ? notFound : null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();

  const handleProductAdd = () => {
    const productToAdd: ProductInBox = { product: product!, quantity };
    dispatch(addToBox(productToAdd));
  };

  useEffect(() => {
    // if (!error) {
    //   getProductById(Number(id))
    //     .then((product) => {
    //       if (!product) setError(notFound);
    //       console.log(product);
    //       setProduct(product);
    //     })
    //     .catch(() => setError(notFound))
    //     .finally(() => setLoading(false));
    // }
    setProduct({
      id: 11,
      name: "Pinky girl set",
      description:
        "This cute and girly makeup set includes everything you need for a fresh and pretty look.",
      image:
        "https://firebasestorage.googleapis.com/v0/b/gift-shop-4bf1f.appspot.com/o/images%2F11.jpg?alt=media&token=a0ca7760-2bf1-4d83-8b8e-fcf39e6d319f",
      price: 30,
    });
  }, []);

  if (error)
    return (
      <div style={{ position: "absolute", top: "50%", left: "45%" }}>
        {error}
      </div>
    );
  // if (loading) return <Spinnner />;
  return (
    <div className="flex flex-col md:flex-row absolute top-28">
      <div className="mx-auto relative w-9/12 h-56">
      <img
        src={product?.image}
        alt={product?.name}
        className="w-full h-full object-cover"
      />
      </div>
      <div className="flex flex-col w-9/12 mx-auto relative top-10 p-10 rounded-t-[4rem] bg-[#272525]">
        <h2 className="text-xl font-bold mb-2">{product?.name}</h2>
        <span className="font-bold text-lg mb-2">${product?.price}</span>
        <p className="text-gray-600 mt-4 mb-8">{desc}</p>
      </div>
      <div className="flex flex-col relative top-8 mx-auto w-64 border border-gray-500 box-content p-9 rounded-2xl">
        <span className="">Total Price</span>
        <span className="font-bold"><sup>$</sup>{quantity * product?.price!}</span>
        <Selector quantity={quantity} setQuantity={setQuantity}/>
        <button
          onClick={() => handleProductAdd()}
          className="bg-red-600 relative text-white px-4 py-2 mt-6 mx-auto rounded h-12 w-9/12 active:scale-95 flex row items-center justify-center"
        >
          <BsGiftFill className="w-6 h-6 pr-2" /> Add To Gift Box
        </button>
      </div>
    </div>
  );
}
