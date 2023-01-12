import { ACTIONS } from "../animationReducer";
import { sleep } from "../utils";

const COLORS = {
  MERGING_IDX: "greenyellow",
  COPY_IDX: "red",
};
async function mergeSort(animation, dispatchAnimation) {
  const indexRange = [0, animation.array.length - 1];
  await mergeSortHelper(
    [...animation.array],
    [...animation.array],
    ...indexRange,
    dispatchAnimation,
    animation.animationDelay
  );
  return animation.array;
}
async function mergeSortHelper(
  array,
  auxiliaryArray,
  startIdx,
  endIdx,
  dispatchAnimation,
  delay
) {
  if (endIdx === startIdx) {
    return;
  }
  const midIdx = Math.floor((startIdx + endIdx) / 2);
  await mergeSortHelper(
    auxiliaryArray,
    array,
    startIdx,
    midIdx,
    dispatchAnimation,
    delay
  );
  await mergeSortHelper(
    auxiliaryArray,
    array,
    midIdx + 1,
    endIdx,
    dispatchAnimation,
    delay
  );
  await mergeLeftRight(
    array,
    auxiliaryArray,
    startIdx,
    midIdx,
    endIdx,
    dispatchAnimation,
    delay
  );
}

async function mergeLeftRight(
  array,
  auxiliaryArray,
  startIdx,
  midIdx,
  endIdx,
  dispatchAnimation,
  delay
) {
  let i = startIdx,
    j = midIdx + 1,
    copyFromIdx = null;

  for (let k = startIdx; k <= endIdx; k++) {
    if (i <= midIdx && (j > endIdx || auxiliaryArray[i] <= auxiliaryArray[j])) {
      copyFromIdx = i;
      array[k] = auxiliaryArray[i++];
    } else {
      copyFromIdx = j;
      array[k] = auxiliaryArray[j++];
    }
    dispatchAnimation({
      type: ACTIONS.SET_INDEX_COLOR,
      payload: [
        [k, COLORS.MERGING_IDX],
        [copyFromIdx, COLORS.COPY_IDX],
      ],
    });
    dispatchAnimation({ type: ACTIONS.SET_ARRAY, payload: [...array] });

    await sleep(delay);

    dispatchAnimation({
      type: ACTIONS.CLEAR_INDEX_COLOR,
      payload: [k, copyFromIdx],
    });
  }
}

export default mergeSort;
