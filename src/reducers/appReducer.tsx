import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState, Product, ProductInBox } from "../types";
import { RootState } from "../store";
import { getBoxFromLocalStorage } from "../lib/utils";

const initialState: AppState = {
  isSignInModalShown: false,
  isSignUpModalShown: false,
  products: [],
  box: getBoxFromLocalStorage() || [],
};

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
