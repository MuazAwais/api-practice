import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const res = await fetch(`${apiUrl}/products`)
        const data = await res.json();
        return data;
    }
)

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const res = await fetch(`${apiUrl}/users`)
        const data = await res.json();
        return data;
    }
)

export const fetchCarts = createAsyncThunk(
    'carts/fetchCarts',
    async () => {
        const res = await fetch(`${apiUrl}/carts`)
        const data = await res.json();
        return data;
    }
)

const initialState = {
  products: [],
  productsLoading: false,
  productsError: null,

  users: [],
  usersLoading: false,
  usersError: null,

  carts: [],
  cartsLoading: false,
  cartsError: null,
}
const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers:{
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        },
        setSelectedUserId: (state, action) => {
            state.selectedUserId = action.payload;
        },
        clearCurrentPost: (state) => {
            state.currentPost = null;
        },
        clearErrors: (state) => {
            state.usersError = null;
            state.productsError = null;
            state.cartsError = null;
        },
    },
    extraReducers: (builder) => {
        // Products
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.productsLoading = true;
                state.productsError = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.productsLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.productsLoading = false;
                state.productsError = action.error.message;
            })
        // Users
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.usersLoading = true;
                state.usersError = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.usersLoading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.usersLoading = false;
                state.usersError = action.error.message;
            })
        // Carts
        builder
            .addCase(fetchCarts.pending, (state) => {
                state.cartsLoading = true;
                state.cartsError = null;
            })
            .addCase(fetchCarts.fulfilled, (state, action) => {
                state.cartsLoading = false;
                state.carts = action.payload;
            })
            .addCase(fetchCarts.rejected, (state, action) => {
                state.cartsLoading = false;
                state.cartsError = action.error.message;
            })
    }
})

export const { setActiveTab, setSelectedUserId, clearCurrentPost, clearErrors } = apiSlice.actions;
export default apiSlice.reducer;