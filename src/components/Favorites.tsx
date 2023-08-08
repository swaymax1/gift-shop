import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ProductItem } from "./ProductItem";
import { Product } from "../types";
import { AiFillHeart } from "react-icons/ai";

export default function Favorites() {
  const favorites = useSelector(
    (state: RootState) => state.authReducer.favorites
  );

  return (
    <div className="flex flex-col ml-5 mt-5">
      <h1 className="font-bold text-2xl">
        Favorites <AiFillHeart className="inline text-red-600"/>
      </h1>
      <div className="flex flex-col w-3/5 md:w-1/5 mx-auto mt-6">
        {favorites.map((product: Product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
