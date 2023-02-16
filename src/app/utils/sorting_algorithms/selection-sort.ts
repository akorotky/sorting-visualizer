import { COLOR } from "../../other/constants";
import { swap } from "../common";
import { AnimationGenerator, colorIndices } from "../../types";

function* selectionSort(
  arr: number[],
  startIdx = 0,
  endIdx = arr.length - 1
): AnimationGenerator {
  let i, j, minIdx;

  for (i = startIdx; i < endIdx; i++) {
    minIdx = i;
    for (j = i + 1; j <= endIdx; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }

    yield* swap(arr, minIdx, i);
    yield colorIndices([[i, COLOR.PURPLE]]);
  }
}
export default selectionSort;
