import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Product, ProductInBox } from "../types";
import { AppDispatch, RootState } from "../redux/store";
import { addToBox, setAddToBoxCompletedFalse, setProductsLoading } from "../redux/productSlice";
import { getProductById } from "../lib/utils";
import Spinnner from "./Spinner";
import Selector from "./Selector";
import { BsGiftFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addToFavorite } from "../redux/authSlice";
import Footer from "./Footer";

const notFound = "Product not found!";

export default function ProductView() {
  const { id } = useParams();
  const [error, setError] = useState<string | null>(
    id === null ? notFound : null
  );
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState<number>(1);
  const favorites = useSelector(
    (state: RootState) => state.authReducer.favorites
  );
  const user = useSelector((state: RootState) => state.authReducer.currentUser);
  const dispatch = useDispatch<AppDispatch>();
  const addToBoxCompleted = useSelector(
    (state: RootState) => state.productReducer.addToBoxCompleted
  );
  const loading = useSelector(
    (state: RootState) => state.productReducer.loading
  );

  const handleProductAdd = () => {
    const productToAdd: ProductInBox = { product: product!, quantity };
    dispatch(addToBox(productToAdd));
  };

  useEffect(() => {
    dispatch(setProductsLoading(true));
    if (!error) {
      getProductById(Number(id))
        .then((product) => {
          if (!product) setError(notFound);
          setProduct(product);
        })
        .catch(() => setError(notFound))
        .finally(() => dispatch(setProductsLoading(false)));
    }
  }, []);

  useEffect(() => {
    if (addToBoxCompleted) {
      toast.success("Product added to box!", {
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { backgroundColor: "black", color: "white" },
      });
      dispatch(setAddToBoxCompletedFalse());
    }
  }, [addToBoxCompleted]);

  if (error)
    return (
      <div style={{ position: "absolute", top: "50%", left: "45%" }}>
        {error}
      </div>
    );
  if (loading) return <Spinnner />;
  return (
    <div className="flex flex-col md:flex-row absolute md:w-10/12 top-28 md:left-24 md:top-40">
      <div className="flex flex-col mx-auto relative w-9/12 h-56">
        <img
          src={product?.image}
          alt={product?.name}
          className="w-full h-80 object-cover md:w-80"
        />
      </div>

      <div className="flex flex-col p-10 w-10/12 rounded-3xl bg-[#383737] mx-auto mt-36 md:h-5/6 md:ml-8 md:mt-5">
        <div className="flex flex-row">
          <h2 className="text-xl font-bold mb-2">{product?.name}</h2>
          {favorites.filter((cur) => cur.id === product?.id).length
            ? user && (
                <AiFillHeart className="text-red-600 text-2xl ml-5 mt-1" />
              )
            : user && (
                <AiOutlineHeart
                  className="text-red-600 text-2xl ml-5 mt-1 cursor-pointer"
                  onClick={() => {
                    dispatch(addToFavorite(product!));
                  }}
                />
              )}
        </div>
        <span className="font-semibold text-gray-200 text-lg mb-3">
          ${product?.price}
        </span>
        <p className="text-gray-300 mt-10 mb-8">{product?.description}</p>
      </div>

      <div className="flex flex-col mx-auto border border-gray-500 box-content p-9 rounded-2xl w-7/12 md:h-5/6 mt-12 md:ml-10">
        <span className="mb-2">Total Price</span>
        <span className="font-bold mb-2">
          <sup>$</sup>
          {quantity * product?.price!}
        </span>
        <Selector quantity={quantity} setQuantity={setQuantity} />
        <button
          onClick={() => handleProductAdd()}
          className="bg-red-600 relative text-white p-4 mt-6 mx-auto rounded h-12 w-9/12 active:scale-95 flex row items-center justify-center"
        >
          <BsGiftFill className="w-6 h-6 pr-2" /> Add To Gift Box
        </button>
      </div>
      <Footer classes="md:hidden"/>
    </div>
  );
}
