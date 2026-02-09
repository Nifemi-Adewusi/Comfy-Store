import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/user/userSlice";
import wishlistReducer from "./features/wishlist/wishlistSlice";

export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    userState: userReducer,
    wishlistState: wishlistReducer,
  },
});
