import { swap } from "../common";
import { AnimationGenerator } from "../../types";

function* heapSort(
  arr: number[],
  startIdx = 0,
  endIdx = arr.length - 1
): AnimationGenerator {
  yield* heapify(arr, startIdx, endIdx);
  while (endIdx > startIdx) {
    yield* swap(arr, startIdx, endIdx);
    yield* siftDown(arr, startIdx, --endIdx);
  }
}
function* heapify(
  arr: number[],
  startIdx = 0,
  endIdx = arr.length - 1
): AnimationGenerator {
  let curIdx = Math.floor((endIdx - startIdx) / 2);
  while (curIdx >= 0) {
    yield* siftDown(arr, curIdx--, endIdx);
  }
}

function* siftDown(
  arr: number[],
  startIdx: number,
  endIdx: number
): AnimationGenerator {
  let rootIdx = startIdx;
  let leftRootChildIdx = 2 * rootIdx + 1;
  while (leftRootChildIdx <= endIdx) {
    let childIdx = leftRootChildIdx;
    let swapIdx = rootIdx;

    if (arr[swapIdx] < arr[childIdx]) {
      swapIdx = childIdx;
    }
    if (childIdx + 1 <= endIdx && arr[swapIdx] <= arr[childIdx + 1]) {
      swapIdx = childIdx + 1;
    }
    if (swapIdx === rootIdx) {
      return;
    } else {
      yield* swap(arr, rootIdx, swapIdx);
      rootIdx = swapIdx;
      leftRootChildIdx = 2 * rootIdx + 1;
    }
  }
}

export default heapSort;
