import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../service/authService";

const user = JSON.parse(localStorage.getItem("token"));

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      return await loginApi(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user || null,
    isLoading: false,
    isError: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        localStorage.setItem("token", JSON.stringify(action.payload.accessToken));
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
