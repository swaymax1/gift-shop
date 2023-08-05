import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { auth, db } from "../services/firebase";
import { AuthState, LoginCredentials, Product } from "../types";
import { RootState } from "./store";
import { FirebaseError } from "firebase/app";
import {
  createProductFromDoc,
  getFirebaseErrorMessageFromCode,
} from "../lib/utils";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const initialState: AuthState = {
  currentUser: null,
  loading: false,
  error: null,
  signInModalOn: false,
  signUpModalOn: false,
  favorites: [],
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const { email, password } = credentials;
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredentials.user;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const { email, password } = credentials;
      const useCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return useCredentials.user;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      auth.signOut();
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const fetchFavorites = createAsyncThunk(
  "auth/favorites",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const uid = state.authReducer.currentUser?.uid;
    const idSnapshot = await getDocs(
      query(collection(db, "users"), where("uid", "==", uid))
    );
    if (idSnapshot.empty) return rejectWithValue(new Error("User not found"));
    else {
      const ids: number[] = idSnapshot.docs[0].data()["favorites"];
      const productSnapshot = await getDocs(
        query(collection(db, "products"), where("id", "in", ids))
      );
      const fetchedProducts: Product[] = [];
      productSnapshot.forEach((doc) =>
        fetchedProducts.push(createProductFromDoc(doc))
      );
      return fetchedProducts;
    }
  }
);

export const addToFavorite = createAsyncThunk(
  "auth/addToFavorites",
  async (product: Product, { getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      const uid = state.authReducer.currentUser?.uid;
      const snapshot = await getDocs(
        query(collection(db, "users"), where("uid", "==", uid))
      );
      if (snapshot.size == 1) {
        updateDoc(snapshot.docs[0].ref, {
          favorites: [...snapshot.docs[0].data()["favorites"], product.id],
        });
      }
      dispatch(fetchFavorites());
    } catch (e) {
      console.log(e);
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
    setSignInModalOn: (state) => {
      state.signInModalOn = true;
      state.signUpModalOn = false;
      state.error = "";
    },
    setSignInModalOff: (state) => {
      state.signInModalOn = false;
    },
    setSignUpModalOn: (state) => {
      state.signUpModalOn = true;
      state.signInModalOn = false;
      state.error = "";
    },
    setSignUpModalOff: (state) => {
      state.signUpModalOn = false;
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
        state.signInModalOn = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        const error = action.payload;
        if (error instanceof FirebaseError) {
          state.error = getFirebaseErrorMessageFromCode(error.code);
        } else state.error = "Something went wrong";
      })
      .addCase(login.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = null;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
        state.error = "Could not log out";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.signUpModalOn = false;
        const usersRef = collection(db, "users");
        addDoc(usersRef, {
          uid: state.currentUser?.uid,
          favorites: [],
        });
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        const error = action.payload;
        if (error instanceof FirebaseError) {
          state.error = getFirebaseErrorMessageFromCode(error.code);
        } else state.error = "Something went wrong";
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  },
});

export const {
  setLoading,
  setError,
  setCurrentUser,
  setSignInModalOff,
  setSignInModalOn,
  setSignUpModalOn,
  setSignUpModalOff,
  clearFavorites,
} = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectUser = (state: RootState) => state.authReducer.currentUser;
export const selectLoading = (state: RootState) => state.authReducer.loading;
export const selectError = (state: RootState) => state.authReducer.error;

export default authSlice.reducer;
