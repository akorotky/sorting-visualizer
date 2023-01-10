import { generateArray } from "./utils";

function initAnimation(arraySize) {
  return {
    array: generateArray(arraySize),
    isArraySorted: false,
    activeIndex: null,
    pivotIndex: null,
    sortingSpeed: 10
  };
}

const ACTIONS = {
  SET_ARRAY: "SET_ARRAY",
  SET_SORTED_STATE: "SET_SORTED_STATE",
  SET_ACTIVE_INDEX: "SET_ACTIVE_INDEX",
  SET_PIVOT_INDEX: "SET_PIVOT_INDEX",
  SET_SORTING_SPEED: "SET_SORTING_SPEED",
  RESET: "RESET",
};

function animationReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_ARRAY:
      return { ...state, array: action.payload };
    case ACTIONS.SET_ACTIVE_INDEX:
      return { ...state, activeIndex: action.payload };
    case ACTIONS.SET_PIVOT_INDEX:
      return { ...state, pivotIndex: action.payload };
    case ACTIONS.SET_SORTED_STATE:
      return { ...state, isArraySorted: action.payload };
    case ACTIONS.RESET:
      return initAnimation(100);
    case ACTIONS.SET_SORTING_SPEED:
        return {...state, sortingSpeed: action.payload}
    default:
      throw new Error("Unknown action:" + action.type);
  }
}

export { initAnimation, ACTIONS, animationReducer };
