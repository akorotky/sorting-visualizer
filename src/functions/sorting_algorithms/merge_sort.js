import { ACTIONS } from "../animationReducer";
import { sleep } from "../utils";

async function mergeSort(animation, dispatchAnimation) {
  const indexRange = [0, animation.array.length - 1];
  await mergeSortHelper(
    animation.array,
    ...indexRange,
    dispatchAnimation,
    animation.sortingSpeed
  );
  return animation.array;
}
async function mergeSortHelper(
  array,
  startIdx,
  endIdx,
  dispatchAnimation,
  speed
) {
  if (endIdx === startIdx) {
    return;
  }
  const mid = Math.floor((startIdx + endIdx) / 2);
  await mergeSortHelper(array, startIdx, mid, dispatchAnimation, speed);
  await mergeSortHelper(array, mid + 1, endIdx, dispatchAnimation, speed);
  await mergeLeftRight(array, startIdx, mid, endIdx, dispatchAnimation, speed);
}

async function mergeLeftRight(
  array,
  startIdx,
  mid,
  endIdx,
  dispatchAnimation,
  speed
) {
  const leftRightHalves = array.slice(startIdx, endIdx + 1);
  const newMid = mid - startIdx;
  let i = 0,
    j = newMid + 1,
    k = startIdx;

  // merge two arrays into one sorted array
  while (k <= endIdx) {
    if (i <= newMid && j < leftRightHalves.length) {
      if (leftRightHalves[i] <= leftRightHalves[j]) {
        array[k++] = leftRightHalves[i++];
      } else {
        array[k++] = leftRightHalves[j++];
      }
    } else if (i <= newMid) {
      array[k++] = leftRightHalves[i++];
    } else {
      array[k++] = leftRightHalves[j++];
    }

    dispatchAnimation({ type: ACTIONS.SET_ACTIVE_INDEX, payload: k - 1 });
    dispatchAnimation({ type: ACTIONS.SET_ARRAY, payload: [...array] });
    await sleep(speed);
  }
  dispatchAnimation({ type: ACTIONS.SET_ACTIVE_INDEX, payload: null });
}

export default mergeSort;
