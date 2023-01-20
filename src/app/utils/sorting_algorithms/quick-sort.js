import { partition } from "../common";

// In-place Quicksort implementing Hoare partition
// using the middle element as the pivot

function* quickSort(array) {
  yield* quickSortHelper(array, 0, array.length - 1);
}
function* quickSortHelper(array, startIdx, endIdx) {
  if (startIdx >= endIdx) {
    return;
  }

  var pivotIdx = yield* partition(array, startIdx, endIdx);
  yield* quickSortHelper(array, startIdx, pivotIdx);
  yield* quickSortHelper(array, pivotIdx + 1, endIdx);
}

export default quickSort;
