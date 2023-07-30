import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderState, Order } from "../types";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";

const initialState : OrderState = {
    order: null,
}

export const placeOrder = createAsyncThunk(
    "order/placeOrder",
    async (order : Order, {rejectWithValue}) => {
        try {
            const orderRef = collection(db, "order");
            await addDoc(orderRef, order);
        } catch(error) {
            return rejectWithValue(error);
        }
    }
)

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(placeOrder.fulfilled, (state) => {
            console.log('yooo');
        })
        .addCase(placeOrder.rejected, (state) => {

        })
    }
});

export const orderReducer = orderSlice.reducer;
export const { } = orderSlice.actions;

