import { Product } from "../types"
import ProductItem from "./ProductItem"

interface Props {
    products: Product[],
}

export default function ProductsList({products} : Props) {
  return (
    <div className="flex flex-wrap justify-center absolute top-32">
      {products.map((product, i) => (
        <ProductItem product={product} key={i} />
      ))}
    </div>
  )
}
