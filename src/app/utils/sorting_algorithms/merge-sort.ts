import { COLOR } from "../../other/constants";
import {
  AnimationGenerator,
  clearIndices,
  colorIndices,
  replaceIndices,
} from "../../types";

function* mergeSort(arr: number[]): AnimationGenerator {
  yield* mergeSortHelper(arr, [...arr], 0, arr.length - 1);
}
function* mergeSortHelper(
  arr: number[],
  auxiliaryArray: number[],
  startIdx: number,
  endIdx: number
): AnimationGenerator {
  if (endIdx <= startIdx) {
    return;
  }
  const midIdx = Math.floor((startIdx + endIdx) / 2);
  yield* mergeSortHelper(auxiliaryArray, arr, startIdx, midIdx);
  yield* mergeSortHelper(auxiliaryArray, arr, midIdx + 1, endIdx);
  yield* mergeLeftRight(arr, auxiliaryArray, startIdx, midIdx, endIdx);
}

function* mergeLeftRight(
  arr: number[],
  auxiliaryArray: number[],
  startIdx: number,
  midIdx: number,
  endIdx: number
): AnimationGenerator {
  let i = startIdx,
    j = midIdx + 1,
    copyFromIdx = null;

  for (let k = startIdx; k <= endIdx; k++) {
    if (i <= midIdx && (j > endIdx || auxiliaryArray[i] <= auxiliaryArray[j])) {
      copyFromIdx = i;
      arr[k] = auxiliaryArray[i++];
    } else {
      copyFromIdx = j;
      arr[k] = auxiliaryArray[j++];
    }

    yield colorIndices([
      [k, COLOR.GREEN],
      [copyFromIdx, COLOR.RED],
    ]);

    yield replaceIndices([[k, auxiliaryArray[copyFromIdx]]]);
    yield clearIndices([k, copyFromIdx]);
  }
}

export default mergeSort;
