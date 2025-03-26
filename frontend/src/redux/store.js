import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice.js"; // Import your task slice
import authReducer from "./authSlice.js";

const store = configureStore({
  reducer: {
    tasks: taskReducer, 
    auth: authReducer, 
  },
});

export default store;
