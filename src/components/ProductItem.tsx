import React from 'react'
import { Link } from "react-router-dom";
import { Product } from "../types";

interface Props {
  product: Product;
}

export const ProductItem = React.memo(({ product }: Props) => {
  return (
    <Link to={`/products/${product.id}`}>
      <div className="rounded-md shadow-md p-4 h-[22rem] md:h-[25rem] bg-[#383737] mt-3">
        <img
          className="mx-auto rounded-lg shadow-lg h-4/6 w-full"
          src={product.image}
          alt={product.name}
        />
        <div className="flex flex-col items-start relative mt-3 h-2/6">
          <h3 className="font-semibold">{product.name}</h3>
          <span className="text-sm text-gray-300 overflow-hidden hidden md:block">
            {product.description.length < 100
              ? product.description
              : product.description.slice(0, 100) + "..."}
          </span>
          <span className="text-gray-100 font-medium absolute bottom-2 left-2">
            ${product.price}
          </span>
        </div>
      </div>
    </Link>
  );
});
