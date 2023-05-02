import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { appReducer, authReducer } from "./reducers";

const store = configureStore({
  reducer: {
    authReducer,
    appReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  })
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
