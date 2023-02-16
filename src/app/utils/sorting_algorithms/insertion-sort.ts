import { COLOR } from "../../other/constants";
import { swap } from "../common";
import {
  AnimationGenerator,
  clearIndices,
  colorIndices,
} from "../../types";

function* insertionSort(
  arr: number[],
  startIdx = 0,
  endIdx = arr.length - 1
): AnimationGenerator {
  for (let i = startIdx + 1; i <= endIdx; i++) {
    yield colorIndices([[i, COLOR.PURPLE]]);
    for (let j = i; j > startIdx; j--) {
      if (arr[j] < arr[j - 1]) {
        yield* swap(arr, j - 1, j);
        yield colorIndices([[i, COLOR.PURPLE]]);
      } else break;
    }
    yield clearIndices([i]);
  }
}

export default insertionSort;
