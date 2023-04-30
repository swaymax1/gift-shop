import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../services/firebase";
import { AuthState, loginCredentials } from "../types";
import { RootState } from "../store";

const initialState: AuthState = {
  currentUser: null,
  loading: false,
  error: null,
};

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
        state.currentUser = action.payload!;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(login.pending, (state) => {
        state.error = null;
        state.loading = true;
      });
  },
});

export const { setLoading, setError, setCurrentUser } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: loginCredentials, { rejectWithValue }) => {
    try {
      const { email, password } = credentials;
      const useCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return useCredentials.user;
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await auth.signOut();
});

export const selectUser = (state: RootState) => state.authReducer.currentUser;
export const selectLoading = (state: RootState) => state.authReducer.loading;
export const selectError = (state: RootState) => state.authReducer.error;

export default authSlice.reducer;
