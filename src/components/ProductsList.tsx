import InfiniteScroll from "react-infinite-scroll-component";
import { ProductItem } from "./ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../reducers/store";
import {
  getNextProducts,
  selectHasMore,
  selectProducts,
} from "../reducers/appReducer";
import Spinner from "./Spinner";

export default function ProductsList() {
  const dispatch = useDispatch<AppDispatch>();
  const hasMore = useSelector(selectHasMore);
  const products = useSelector(selectProducts);

  return (
    <InfiniteScroll
      className="flex flex-wrap justify-center absolute top-32 isc"
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
