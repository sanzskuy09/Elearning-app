import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  users: [],
  isLogin: false,
  error: "",
};

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    try {
      const response = await axios.post("/api/login", { email, password }); // Your login API endpoint
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getUserAsync = createAsyncThunk("auth/getUser", async () => {
  const response = await axios.get("/api/user"); // Your get API endpoint
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.isLogin = true;
    },
    logoutUser: (state, action) => {
      state.loading = false;
      state.users = [];
      state.isLogin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.isLogin = true;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [];
        state.isLogin = false;
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
