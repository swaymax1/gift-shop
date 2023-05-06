import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState, Product, ProductInBox } from "../types";
import { RootState } from "../store";
import {
  getBoxFromLocalStorage,
  getFirebaseErrorMessageFromCode,
} from "../lib/utils";
import {
  DocumentData,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { FirebaseError } from "firebase/app";

const initialState: AppState = {
  isSignInModalShown: false,
  isSignUpModalShown: false,
  products: [],
  box: getBoxFromLocalStorage() || [],
  lastProduct: null,
  loading: true,
  error: null,
  hasMoreProducts: true,
};

const getFirstProducts = createAsyncThunk(
  "getFirstProducts",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const productsRef = collection(db, "products");
      const snapshot = await getDocs(query(productsRef, limit(10)));
      const fetchedProducts: Product[] = [];
      snapshot.forEach((doc) => {
        let product: Product = {
          name: doc.get("name"),
          description: doc.get("description"),
          id: doc.get("id"),
          price: doc.get("price"),
          image: doc.get("image"),
        };
        fetchedProducts.push(product);
      });
      dispatch(setProducts(fetchedProducts));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getNextProducts = createAsyncThunk(
  "app/getNextProducts",
  async (_, { getState, rejectWithValue }) => {
    try {
      const productsRef = collection(db, "products");
      const state = getState() as RootState;
      const { lastProduct } = state.appReducer;
      const snapshot = await getDocs(
        query(productsRef, limit(10), orderBy("id"), startAfter(lastProduct))
      );
      const fetchedProducts: Product[] = [];
      snapshot.forEach((doc) => {
        let product: Product = {
          name: doc.get("name"),
          description: doc.get("description"),
          id: doc.get("id"),
          price: doc.get("price"),
          image: doc.get("image"),
        };
        fetchedProducts.push(product);
      });
      return {
        products: fetchedProducts,
        lastProduct: snapshot.docs[snapshot.size - 1]
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
    setIsSignInModalShown: (state, action: PayloadAction<boolean>) => {
      state.isSignInModalShown = action.payload;
    },
    setIsSignUpModalShown: (state, action: PayloadAction<boolean>) => {
      state.isSignUpModalShown = action.payload;
    },
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
      localStorage.setItem("box", JSON.stringify(state.box));
    },
    removeFromBox: (state, action: PayloadAction<Product>) => {
      state.box = state.box.filter(
        (productInBox) => productInBox.product.id !== action.payload.id
      );
      state.box.slice(0);
      localStorage.setItem("box", JSON.stringify(state.box));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getNextProducts.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (action.payload.products < 10) state.hasMoreProducts = false;
          state.products.push(...action.payload.products);
          state.lastProduct = action.payload.lastProduct;
          state.loading = false;
        }
      )
      .addCase(getNextProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNextProducts.rejected, (state, action) => {
        state.loading = false;
        const error = action.payload;
        if (error instanceof FirebaseError) {
          state.error = getFirebaseErrorMessageFromCode(error.code);
        } else state.error = "something went wrong";
      });
  },
});

export const appReducer = appSlice.reducer;
export const {
  setIsSignInModalShown,
  setIsSignUpModalShown,
  setProducts,
  addToBox,
  removeFromBox,
} = appSlice.actions;

export const selectSignInModal = (state: RootState) =>
  state.appReducer.isSignInModalShown;
export const selectSignUpModal = (state: RootState) =>
  state.appReducer.isSignUpModalShown;
export const selectProducts = (state: RootState) => state.appReducer.products;
export const selectProductsInBox = (state: RootState) => state.appReducer.box;
export const selectLoading = (state: RootState) => state.appReducer.loading;
export const selectHasMore = (state: RootState) =>
  state.appReducer.hasMoreProducts;
