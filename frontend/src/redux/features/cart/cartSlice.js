import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

// Load initial cart items from localStorage
const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem("cartItems");
  return cartData ? JSON.parse(cartData) : [];
};

const initialState = {
  cartItems: loadCartFromLocalStorage(), // Initialize with saved cart items
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(item => item._id === action.payload._id);
      if (!existingItem) {
        state.cartItems.push(action.payload);

        // Save to localStorage
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product Added to the Cart",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "Already Added to the Cart",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK!",
        });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);

      // Update localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];

      // Clear localStorage
      localStorage.removeItem("cartItems");
    },
  },
});

// Export the actions
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;