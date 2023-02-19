import { COLOR } from "../../other/constants";
import { colorIndices, swap } from "../common";
import { AnimationGenerator } from "../../types";

function* bubbleSort(arr: number[]): AnimationGenerator {
  let isSorted = false;
  let sortedIdx = 0;
  while (!isSorted) {
    isSorted = true;
    for (let i = 1; i < arr.length - sortedIdx; i++) {
      if (arr[i] < arr[i - 1]) {
        yield* swap(arr, i - 1, i);
        isSorted = false;
      }
    }
    sortedIdx++;
    yield colorIndices([[arr.length - sortedIdx, COLOR.PURPLE]]);
  }
}

export default bubbleSort;
