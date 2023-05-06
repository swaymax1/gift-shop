import InfiniteScroll from "react-infinite-scroll-component";
import { Product } from "../types";
import ProductItem from "./ProductItem";
import { TailSpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { getNextProducts, selectHasMore } from "../reducers/appReducer";
import { Spinner } from "react-bootstrap";

interface Props {
  products: Product[];
}

export default function ProductsList({ products }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const hasMore = useSelector(selectHasMore);

  return (
    <InfiniteScroll
      className="flex flex-wrap justify-center absolute top-32"
      dataLength={products.length}
      loader={<Spinner />}
      hasMore={hasMore}
      next={() => dispatch(getNextProducts())}
    >
      {products.map((product, i) => (
        <ProductItem product={product} key={i} />
      ))}
    </InfiniteScroll>
  );
}
