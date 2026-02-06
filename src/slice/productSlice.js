import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProductsApi,
  addProductApi,
  updateProductApi,
  fetchProductByIdApi,
  deleteProductApi,
} from "../service/authService";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (_, thunkAPI) => {
    try {
      return await fetchProductsApi();
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to load products");
    }
  },
);

export const addProduct = createAsyncThunk(
  "products/add",
  async (data, thunkAPI) => {
    try {
      return await addProductApi(data);
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add product");
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, thunkAPI) => {
    try {
      return await fetchProductByIdApi(id);
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch product");
    }
  },
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, data }, thunkAPI) => {
    try {
      return await updateProductApi({ id, data });
    } catch {
      return thunkAPI.rejectWithValue("Failed to update product");
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, thunkAPI) => {
    try {
      return await deleteProductApi(id);
    } catch {
      return thunkAPI.rejectWithValue("Failed to delete product");
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  reducers: {
    resetProductState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products.unshift(action.payload);
      })
      .addCase(addProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.products = state.products.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        );
      })
      .addCase(updateProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;

        state.products = state.products.filter(
          (item) => item.id !== action.payload.id,
        );
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
