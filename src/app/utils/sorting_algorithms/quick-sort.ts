import { partition } from "../common";
import { AnimationGenerator } from "../../types";

// In-place Quicksort implementing Hoare partition
// using the middle element as the pivot

function* quickSort(arr: number[]): AnimationGenerator {
  yield* quickSortHelper(arr, 0, arr.length - 1);
}
function* quickSortHelper(
  arr: number[],
  startIdx: number,
  endIdx: number
): AnimationGenerator {
  if (startIdx >= endIdx) {
    return;
  }

  var pivotIdx: number = yield* partition(arr, startIdx, endIdx);
  yield* quickSortHelper(arr, startIdx, pivotIdx);
  yield* quickSortHelper(arr, pivotIdx + 1, endIdx);
}

export default quickSort;
