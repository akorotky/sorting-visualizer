import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ARRAY_SIZE,
} from "../other/constants";

import { createSlice } from "@reduxjs/toolkit";
import { generateArray } from "../utils/common";

const initialState = {
  array: generateArray(INITIAL_ARRAY_SIZE),
  coloredIndices: {},
  isRunning: false,
  isPaused: false,
  delay: INITIAL_ANIMATION_DELAY,
};

const animationSlice = createSlice({
  name: "animation",
  initialState,
  reducers: {
    setArray: (state, action) => {
      state.array = [...action.payload];
    },
    setIndexColor: (state, action) => {
      const indexColorPairs = action.payload;

      indexColorPairs.forEach((pair) => {
        const [idx, color] = pair;
        state.coloredIndices[idx] = color;
      });
    },
    clearIndexColor: (state, action) => {
      const indicesToClear = action.payload;
      indicesToClear.forEach((idx) => {
        delete state.coloredIndices[idx];
      });
    },
    setDelay: (state, action) => {
      state.delay = action.payload;
    },
    setIsRunning: (state, action) => {
      state.isRunning = action.payload;
    },
    setIsPaused: (state, action) => {
      state.isPaused = action.payload;
    },
  },
});

export const {
  setArray,
  setIndexColor,
  clearIndexColor,
  setDelay,
  setIsRunning,
  setIsPaused,
} = animationSlice.actions;
export default animationSlice.reducer;
