import { generateArray } from "./utils";

function initAnimation(arraySize = 100, animationDelay = 30) {
  return {
    array: generateArray(arraySize),
    isArraySorted: false,
    coloredIndices: {},
    animationDelay: animationDelay,
  };
}

const ACTIONS = {
  SET_ARRAY: "SET_ARRAY",
  SET_SORTED_STATE: "SET_SORTED_STATE",
  SET_INDEX_COLOR: "SET_IDEX_COLOR",
  CLEAR_INDEX_COLOR: "CLEAR_INDEX_COLOR",
  SET_SORTING_SPEED: "SET_SORTING_SPEED",
  RESET: "RESET",
};

function animationReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_ARRAY:
      return { ...state, array: action.payload };
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
      return initAnimation();
    case ACTIONS.SET_SORTING_SPEED:
      return { ...state, animationDelay: action.payload };
    default:
      throw new Error("Unknown action:" + action.type);
  }
}

export { initAnimation, ACTIONS, animationReducer };
