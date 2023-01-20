import { swap } from "../common";

function* heapSort(array, startIdx = 0, endIdx = array.length - 1) {
  yield* heapify(array, startIdx, endIdx);
  while (endIdx > startIdx) {
    yield* swap(array, startIdx, endIdx);
    yield* siftDown(array, startIdx, --endIdx);
  }
}
function* heapify(array, startIdx = 0, endIdx = array.length - 1) {
  let curIdx = Math.floor((endIdx - startIdx) / 2);
  while (curIdx >= 0) {
    yield* siftDown(array, curIdx--, endIdx);
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
