import { logBase2, partition } from "../common";
import insertionSort from "./insertion-sort";
import heapSort from "./heap-sort";
import { AnimationGenerator } from "../../types";

const SIZE_THRESHOLD: number = 16;

// "Top Down Insertion Last" IntroSort
function* introSort3(
  arr: number[],
  startIdx = 0,
  endIdx = arr.length - 1
): AnimationGenerator {
  const maxDepth = logBase2(endIdx - startIdx + 1) * 2;
  yield* introSortLoop3(arr, startIdx, endIdx, maxDepth);
  yield* insertionSort(arr, startIdx, endIdx);
}

function* introSortLoop3(
  arr: number[],
  startIdx: number,
  endIdx: number,
  maxDepth: number
): AnimationGenerator {
  const curSize = endIdx - startIdx + 1;
  if (curSize < SIZE_THRESHOLD) return;
  if (maxDepth === 0) yield* heapSort(arr, startIdx, endIdx);
  else {
    const pivotIdx: number = yield* partition(arr, startIdx, endIdx);
    yield* introSortLoop3(arr, pivotIdx, endIdx, maxDepth - 1);
    yield* introSortLoop3(arr, startIdx, pivotIdx, maxDepth - 1);
  }
}

export default introSort3;
