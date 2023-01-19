import { swap } from "../common";

function* heapSort(array) {
  yield* heapify(array);
  let endIdx = array.length - 1;
  while (endIdx > 0) {
    yield* swap(array, 0, endIdx);
    endIdx--;
    yield* siftDown(array, 0, endIdx);
  }
}
function* heapify(array) {
  let startIdx = Math.floor((array.length - 2) / 2);
  while (startIdx >= 0) {
    yield* siftDown(array, startIdx, array.length - 1);
    startIdx--;
  }
}

function* siftDown(array, startIdx, endIdx) {
  let rootIdx = startIdx;
  let leftRootChildIdx = 2 * rootIdx + 1;
  while (leftRootChildIdx <= endIdx) {
    let childIdx = leftRootChildIdx;
    let swapIdx = rootIdx;

    if (array[swapIdx] < array[childIdx]) {
      swapIdx = childIdx;
    }
    if (childIdx + 1 <= endIdx && array[swapIdx] <= array[childIdx + 1]) {
      swapIdx = childIdx + 1;
    }
    if (swapIdx === rootIdx) {
      return;
    } else {
      yield* swap(array, rootIdx, swapIdx);
      rootIdx = swapIdx;
      leftRootChildIdx = 2 * rootIdx + 1;
    }
  }
}

export default heapSort;
