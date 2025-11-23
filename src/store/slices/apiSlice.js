import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const res = await fetch("apiUrl/products")
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
            state.postsError = null;
            state.usersError = null;
            state.albumsError = null;
            state.photosError = null;
            state.todosError = null;
            state.commentsError = null;
          },


    }
})

export default apiSlice.reducer;