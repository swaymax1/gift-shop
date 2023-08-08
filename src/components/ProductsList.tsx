import InfiniteScroll from "react-infinite-scroll-component";
import { ProductItem } from "./ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  getNextProducts,
  selectHasMore,
  selectProducts,
  setProductsLoading,
} from "../redux/productSlice";
import Spinner from "./Spinner";

export default function ProductsList() {
  const dispatch = useDispatch<AppDispatch>();
  const hasMore = useSelector(selectHasMore);
  const products = useSelector(selectProducts);

  return (
    <div>
      <InfiniteScroll
        className="grid grid-cols-2 gap-3 md:gap-5 md:grid-cols-4 mt-4 mx-2"
        dataLength={products.length}
        loader={<Spinner />}
        hasMore={hasMore}
        next={() => {
          dispatch(getNextProducts());
          dispatch(setProductsLoading(false));
        }}
      >
        {products.map((product, i) => (
          <ProductItem product={product} key={i} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
