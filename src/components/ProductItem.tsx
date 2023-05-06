import React from 'react'
import { Link } from "react-router-dom";
import { Product } from "../types";

interface Props {
  product: Product;
}

export const ProductItem = React.memo(({ product }: Props) => {
  return (
    <Link to={`/products/${product.id}`}>
      <div className="border-cyan-200 rounded-md shadow-md p-4 w-72">
        <img
          className="mx-auto rounded-lg shadow-lg"
          src={product.image}
          alt={product.name}
        />
        <div className="flex flex-col items-start my-2">
          <h3 className="text-gray-700 font-semibold">{product.name}</h3>
          <span className="text-gray-500 text-sm">
            {product.description.length < 100
              ? product.description
              : product.description.slice(0, 100) + "..."}
          </span>
          <span className="text-gray-700 font-medium mt-2">
            ${product.price}
          </span>
        </div>
      </div>
    </Link>
  );
});
