import { ACTIONS } from "../animationReducer";
import { sleep } from "../utils";

const COLORS = {
  PIVOT: "gold",
  SWAP: "deepskyblue",
};

// In-place Quicksort implementing Hoare partition
// using the middle element as the pivot

async function quickSort(animation, dispatchAnimation) {
  const indexRange = [0, animation.array.length - 1];
  return await quickSortHelper(
    animation.array,
    ...indexRange,
    dispatchAnimation,
    animation.animationDelay
  );
}
async function quickSortHelper(
  array,
  startIdx,
  endIdx,
  dispatchAnimation,
  delay
) {
  if (startIdx >= endIdx) {
    return;
  }

  var pivotIdx = await partition(
    array,
    startIdx,
    endIdx,
    dispatchAnimation,
    delay
  );
  await quickSortHelper(array, startIdx, pivotIdx, dispatchAnimation, delay);
  await quickSortHelper(array, pivotIdx + 1, endIdx, dispatchAnimation, delay);
  return [...array];
}

async function partition(array, startIdx, endIdx, dispatchAnimation, delay) {
  // set pivot index
  const mid = Math.floor(startIdx + (endIdx - startIdx) / 2);

  dispatchAnimation({
    type: ACTIONS.SET_INDEX_COLOR,
    payload: [[mid, COLORS.PIVOT]],
  });

  const pivot = array[mid];
  let i = startIdx - 1,
    j = endIdx + 1;

  while (true) {
    do {
      i++;
    } while (array[i] < pivot);
    do {
      j--;
    } while (array[j] > pivot);

    if (i >= j) {
      // clear pivot
      dispatchAnimation({
        type: ACTIONS.CLEAR_INDEX_COLOR,
        payload: [mid],
      });
      return j;
    }

    await swap(array, i, j, dispatchAnimation, delay);
  }
}

async function swap(array, i, j, dispatchAnimation, delay) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;

  dispatchAnimation({
    type: ACTIONS.SET_INDEX_COLOR,
    payload: [
      [i, COLORS.SWAP],
      [j, COLORS.SWAP],
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

export default quickSort;
