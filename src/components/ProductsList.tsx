import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProductItem } from "./ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  getNextProducts,
  selectHasMore,
  selectProducts,
} from "../redux/appReducer";
import Spinner from "./Spinner";

export default function ProductsList() {
  const dispatch = useDispatch<AppDispatch>();
  const hasMore = useSelector(selectHasMore);
  const products = useSelector(selectProducts);

  return (
    <InfiniteScroll
      className="grid grid-cols-2 gap-2 md:grid-cols-3"
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
