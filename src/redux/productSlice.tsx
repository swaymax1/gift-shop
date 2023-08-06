import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductState, Product, ProductInBox } from "../types";
import { RootState } from "./store";
import {
  createProductFromDoc,
  getBoxFromLocalStorage,
  getFirebaseErrorMessageFromCode,
  getNumberOfItems,
  getTotalPrice,
} from "../lib/utils";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { FirebaseError } from "firebase/app";

const initialState: ProductState = {
  products: [],
  box: getBoxFromLocalStorage() || [],
  lastProduct: null,
  error: null,
  hasMoreProducts: true,
  totalQuantity: 0,
  totalPrice : 0,
  addToBoxCompleted : false,
  loading: true,
};

export const getNextProducts = createAsyncThunk(
  "product/getNextProducts",
  async (_, { getState, rejectWithValue }) => {
    try {
      const productsRef = collection(db, "products");
      const state = getState() as RootState;
      const { lastProduct } = state.productReducer;
      const snapshot = await getDocs(
        query(productsRef, limit(16), orderBy("id"), startAfter(lastProduct))
      );
      const fetchedProducts: Product[] = [];
      snapshot.forEach((doc) =>
        fetchedProducts.push(createProductFromDoc(doc))
      );
      return {
        products: fetchedProducts,
        lastProduct: snapshot.docs[snapshot.size - 1],
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addToBox: (state, action: PayloadAction<ProductInBox>) => {
      if (
        state.box.filter(
          (inBox) => inBox.product.id === action.payload.product.id
        ).length
      ) {
        state.box.map((inBox) => (inBox.quantity += action.payload.quantity));
      } else state.box.push(action.payload);
      state.totalQuantity = getNumberOfItems(state.box);
      state.addToBoxCompleted = true;
    },
    removeFromBox: (state, action: PayloadAction<ProductInBox>) => {
      state.box = state.box.filter(
        (productInBox) => productInBox.product.id !== action.payload.product.id
      );
    },
    setTotalQuantity: (state) => {
      state.totalQuantity = getNumberOfItems(state.box);
    },
    setTotalPrice: (state) => {
      state.totalPrice = getTotalPrice(state.box);
    },
    setProductInBoxQuantity: (state, action) => {
      const { id, newQty } = action.payload;
      state.box = state.box.map((productInBox) => {
        if (productInBox.product.id === id) {
          return { ...productInBox, quantity: newQty };
        }
        return productInBox;
      });
    },
    setAddToBoxCompletedFalse: (state) => {
      state.addToBoxCompleted = false;
    },
    setProductsLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getNextProducts.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (action.payload.products < 10) state.hasMoreProducts = false;
          state.products.push(...action.payload.products);
          state.lastProduct = action.payload.lastProduct;
        }
      )
      .addCase(getNextProducts.rejected, (state, action) => {
        const error = action.payload;
        if (error instanceof FirebaseError) {
          state.error = getFirebaseErrorMessageFromCode(error.code);
        } else state.error = "Something went wrong";
      });
  },
});

export const productReducer = appSlice.reducer;
export const {
  setProducts,
  addToBox,
  removeFromBox,
  setTotalQuantity,
  setProductInBoxQuantity,
  setTotalPrice,
  setAddToBoxCompletedFalse,
  setProductsLoading,
} = appSlice.actions;

export const selectProducts = (state: RootState) =>
  state.productReducer.products;
export const selectProductsInBox = (state: RootState) =>
  state.productReducer.box;
export const selectHasMore = (state: RootState) =>
  state.productReducer.hasMoreProducts;
