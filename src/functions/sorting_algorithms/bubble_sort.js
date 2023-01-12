import { ACTIONS } from "../animationReducer";
import { sleep } from "../utils";

const COLORS = {
  SWAP: ["red", "greenyellow"],
  SORTED: "blueviolet",
};

async function bubbleSort(animation, dispatchAnimation) {
  return await bubbleSortHelper(
    animation.array,
    dispatchAnimation,
    animation.animationDelay
  );
}

async function bubbleSortHelper(array, dispatchAnimation, delay) {
  let isSorted = false;
  let sortedIdx = 0;
  while (!isSorted) {
    isSorted = true;
    for (let i = 1; i < array.length - sortedIdx; i++) {
      if (array[i] < array[i - 1]) {
        await swap(array, i - 1, i, dispatchAnimation, delay);
        isSorted = false;
      }
    }
    sortedIdx++;
    dispatchAnimation({
      type: ACTIONS.SET_INDEX_COLOR,
      payload: [[array.length - sortedIdx, COLORS.SORTED]],
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
    payload: [
      [i, COLORS.SWAP[0]],
      [j, COLORS.SWAP[1]],
    ],
  });

  dispatchAnimation({
    type: ACTIONS.SET_ARRAY,
    payload: [...array],
  });

  await sleep(delay);

  dispatchAnimation({
    type: ACTIONS.CLEAR_INDEX_COLOR,
    payload: [i, j],
  });
}

export default bubbleSort;
