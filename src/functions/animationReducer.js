import { INITIAL_ANIMATION_DELAY, INITIAL_ARRAY_SIZE } from "../constants";
import { generateArray } from "./utils";

const ACTIONS = {
  SET_ARRAY: "SET_ARRAY",
  SET_SORTED_STATE: "SET_SORTED_STATE",
  SET_INDEX_COLOR: "SET_IDEX_COLOR",
  CLEAR_INDEX_COLOR: "CLEAR_INDEX_COLOR",
  SET_ANIMATION_DELAY: "SET_ANIMATION_DELAY",
  RESET: "RESET",
};

function initAnimationState() {
  return {
    animationArray: generateArray(INITIAL_ARRAY_SIZE),
    isArraySorted: false,
    coloredIndices: {},
    animationDelay: INITIAL_ANIMATION_DELAY,
  };
}

function animationReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_ARRAY:
      return { ...state, animationArray: [...action.payload] };
    case ACTIONS.SET_INDEX_COLOR:
      // payload should be a 2-D array
      const indexSet = { ...state.coloredIndices };
      const indexColorPairs = action.payload;

      for (const [idx, color] of indexColorPairs) {
        indexSet[idx] = color;
      }
      return {
        ...state,
        coloredIndices: { ...indexSet },
      };
    case ACTIONS.CLEAR_INDEX_COLOR:
      const newIndexSet = { ...state.coloredIndices };
      // paylaod should be an array
      for (const idx of action.payload) {
        delete newIndexSet[idx];
      }

      return {
        ...state,
        coloredIndices: { ...newIndexSet },
      };
    case ACTIONS.SET_SORTED_STATE:
      return { ...state, isArraySorted: action.payload };
    case ACTIONS.RESET:
      return initAnimationState();
    case ACTIONS.SET_ANIMATION_DELAY:
      return { ...state, animationDelay: action.payload };
    default:
      throw new Error("Unknown action:" + action.type);
  }
}

export { initAnimationState, ACTIONS, animationReducer };
