import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";

const store = configureStore({
  reducer: {
    authReducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
