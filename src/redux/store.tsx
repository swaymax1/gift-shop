import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { productReducer, authReducer, orderReducer } from ".";

const store = configureStore({
  reducer: {
    authReducer,
    productReducer,
    orderReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
