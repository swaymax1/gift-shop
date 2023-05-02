import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../types";
import { RootState } from "../store";

const initialState: AppState = {
  isSignInModalShown: false,
  isSignUpModalShown: false,
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
  },
});

export const appReducer = appSlice.reducer;
export const { setIsSignInModalShown, setIsSignUpModalShown } =
  appSlice.actions;
export const selectSignInModal = (state: RootState) =>
  state.appReducer.isSignInModalShown;
export const selectSignUpModal = (state: RootState) =>
  state.appReducer.isSignUpModalShown;
