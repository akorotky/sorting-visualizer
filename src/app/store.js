import { configureStore } from "@reduxjs/toolkit";
import animationReducer from "../app/features/animation-slice";

const store = configureStore({
  reducer: { animation: animationReducer },
});

export default store;
