import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderState, Order } from "../types";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";

const initialState: OrderState = {
  order: null,
  addingOrder: false,
  orderPlaced: false,
};

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (order: Order, { dispatch, rejectWithValue }) => {
    dispatch(setAddingOrder());
    try {
      const orderRef = collection(db, "orders");
      addDoc(orderRef, order);      
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setAddingOrder: (state) => {
      state.addingOrder = !state.addingOrder;
    },
    setOrderPlacedFalse: (state) => {
      state.orderPlaced = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.fulfilled, (state) => {
        state.addingOrder = false;
        state.orderPlaced = true;
      })
  },
});

export const orderReducer = orderSlice.reducer;
export const { setAddingOrder, setOrderPlacedFalse } = orderSlice.actions;
