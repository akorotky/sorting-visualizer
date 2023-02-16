import { logBase2, partition } from "../common";
import insertionSort from "./insertion-sort";
import heapSort from "./heap-sort";
import { AnimationGenerator } from "../../types";

const SIZE_THRESHOLD: number = 16;

// "Bottom Up" IntroSort
function* introSort1(
  arr: number[],
  startIdx = 0,
  endIdx = arr.length - 1
): AnimationGenerator {
  const maxDepth = logBase2(endIdx - startIdx + 1) * 2;
  yield* introSortLoop1(arr, startIdx, endIdx, maxDepth);
}

function* introSortLoop1(
  arr: number[],
  startIdx: number,
  endIdx: number,
  maxDepth: number
): AnimationGenerator {
  const curSize = endIdx - startIdx + 1;
  if (curSize < SIZE_THRESHOLD) yield* insertionSort(arr, startIdx, endIdx);
  else if (maxDepth === 0) yield* heapSort(arr, startIdx, endIdx);
  else {
    const pivotIdx: number = yield* partition(arr, startIdx, endIdx);
    yield* introSortLoop1(arr, startIdx, pivotIdx, maxDepth - 1);
    yield* introSortLoop1(arr, pivotIdx, endIdx, maxDepth - 1);
  }
}

export default introSort1;
