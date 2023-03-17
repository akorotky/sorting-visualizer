import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ARRAY_SIZE,
  OPTIONS,
} from "../other/constants";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateArray } from "../utils/common";
import { SelectOption } from "../types";

interface AnimationState {
  array: number[];
  coloredIndices: { [key: number]: string };
  isRunning: boolean;
  isPaused: boolean;
  delay: number;
  currentSort: SelectOption;
}

const initialState: AnimationState = {
  array: generateArray(INITIAL_ARRAY_SIZE),
  coloredIndices: {},
  isRunning: false,
  isPaused: false,
  delay: INITIAL_ANIMATION_DELAY,
  currentSort: OPTIONS[0],
};

const animationSlice = createSlice({
  name: "animation",
  initialState,
  reducers: {
    setArray: (state, action: PayloadAction<number[]>) => {
      state.array = [...action.payload];
    },
    setIndexColor: (state, action: PayloadAction<[number, string][]>) => {
      const indexColorPairs = action.payload;

      indexColorPairs.forEach((pair) => {
        const [idx, color] = pair;
        state.coloredIndices[idx] = color;
      });
    },
    clearIndexColor: (state, action: PayloadAction<number[]>) => {
      const indicesToClear = action.payload;
      indicesToClear.forEach((idx) => {
        delete state.coloredIndices[idx];
      });
    },
    setDelay: (state, action: PayloadAction<number>) => {
      state.delay = action.payload;
    },
    setIsRunning: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload;
    },
    setIsPaused: (state, action: PayloadAction<boolean>) => {
      state.isPaused = action.payload;
    },
    setCurrentSort: (state, action: PayloadAction<SelectOption>) => {
      state.currentSort = action.payload;
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
  setCurrentSort,
} = animationSlice.actions;
export default animationSlice.reducer;
