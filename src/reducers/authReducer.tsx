import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../services/firebase";
import { AuthState, loginCredentials } from "../types";
import { RootState } from "../store";
import { FirebaseError } from "firebase/app";
import { setIsSignInModalShown } from "./appReducer";
import { getFirebaseErrorMessageFromCode } from "../lib/utils";

const initialState: AuthState = {
  currentUser: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: loginCredentials, { rejectWithValue, dispatch }) => {
    try {
      const { email, password } = credentials;
      const useCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(setIsSignInModalShown(false));
      return useCredentials.user;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        const error = action.payload;
        if (error instanceof FirebaseError) {
          state.error = getFirebaseErrorMessageFromCode(error.code);
        } else state.error = "something went wrong";
      })
      .addCase(login.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = null;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export const { setLoading, setError, setCurrentUser } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const logout = createAsyncThunk("auth/logout", async () => {
  await auth.signOut();
});

export const selectUser = (state: RootState) => state.authReducer.currentUser;
export const selectLoading = (state: RootState) => state.authReducer.loading;
export const selectError = (state: RootState) => state.authReducer.error;

export default authSlice.reducer;
