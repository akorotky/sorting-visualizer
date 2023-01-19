import { configureStore } from "@reduxjs/toolkit";
import animationReducer from "../app/features/animationSlice";

const store = configureStore({
  reducer: { animation: animationReducer },
});

export default store;
