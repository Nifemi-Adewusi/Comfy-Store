import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  wishlistItems: [],
  numItemsInWishlist: 0,
};

const getWishlistFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("wishlist")) || defaultState;
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: getWishlistFromLocalStorage(),
  reducers: {
    addItemToWishlist: (state, action) => {
      const { product } = action.payload;
      const item = state.wishlistItems.find((i) => i.id === product.id);
      if (item) {
        toast.error("Item already in wishlist");
      } else {
        state.wishlistItems.push(product);
        state.numItemsInWishlist += 1;
        toast.success("Item added to wishlist");
      }
      localStorage.setItem("wishlist", JSON.stringify(state));
    },
    removeItemFromWishlist: (state, action) => {
      const { id } = action.payload;
      const item = state.wishlistItems.find((i) => i.id === id);
      if (item) {
        state.wishlistItems = state.wishlistItems.filter((i) => i.id !== id);
        state.numItemsInWishlist -= 1;
        toast.error("Item removed from wishlist");
      }
      localStorage.setItem("wishlist", JSON.stringify(state));
    },
    clearWishlist: (state) => {
      localStorage.setItem("wishlist", JSON.stringify(defaultState));
      return defaultState;
    },
  },
});

export const { addItemToWishlist, removeItemFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
