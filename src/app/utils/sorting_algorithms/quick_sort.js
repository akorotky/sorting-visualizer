import { COLOR } from "../../other/constants";
import { swap } from "../common";

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

function* partition(array, startIdx, endIdx) {
  // set pivot index
  const mid = Math.floor(startIdx + (endIdx - startIdx) / 2);

  yield { color: [[mid, COLOR.YELLOW]] };

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
      yield { clearColor: [mid] };
      return j;
    }

    yield* swap(array, i, j);
    yield { color: [[mid, COLOR.YELLOW]] };
  }
}

export default quickSort;
