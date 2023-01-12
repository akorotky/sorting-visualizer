import { ACTIONS } from "../animationReducer";
import { sleep } from "../utils";

const COLORS = {
  SWAP: ["red", "greenyellow"],
};

async function insertionSort(animation, dispatchAnimation) {
  return await insertionSortHelper(
    animation.array,
    dispatchAnimation,
    animation.animationDelay
  );
}

async function insertionSortHelper(array, dispatchAnimation, delay) {
  for (let i = 1; i < array.length; i++) {
    dispatchAnimation({
      type: ACTIONS.SET_INDEX_COLOR,
      payload: [[i, COLORS.SWAP[1]]],
    });
    for (let j = i; j > 0; j--) {
      if (array[j] < array[j - 1]) {
        await swap(array, j - 1, j, dispatchAnimation, delay);
      } else break;
    }
    dispatchAnimation({
      type: ACTIONS.CLEAR_INDEX_COLOR,
      payload: [i],
    });
  }
  return array;
}

async function swap(array, i, j, dispatchAnimation, delay) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;

  dispatchAnimation({
    type: ACTIONS.SET_INDEX_COLOR,
    payload: [[i, COLORS.SWAP[0]]],
  });

  dispatchAnimation({
    type: ACTIONS.SET_ARRAY,
    payload: [...array],
  });

  await sleep(delay);

  dispatchAnimation({
    type: ACTIONS.CLEAR_INDEX_COLOR,
    payload: [i],
  });
}
export default insertionSort;
