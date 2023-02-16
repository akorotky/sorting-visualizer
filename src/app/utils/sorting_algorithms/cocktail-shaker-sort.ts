import { swap } from "../common";
import { AnimationGenerator } from "../../types";

function* cocktailShakerSort(arr: number[]): AnimationGenerator {
  let swapped = true;
  do {
    swapped = false;
    for (let i = 0; i < arr.length - 2; i++) {
      if (arr[i] > arr[i + 1]) {
        yield* swap(arr, i, i + 1);
        swapped = true;
      }
    }
    swapped = false;
    for (let i = arr.length - 2; i >= 0; i--) {
      if (arr[i] > arr[i + 1]) {
        yield* swap(arr, i, i + 1);
        swapped = true;
      }
    }
  } while (swapped);
}

export default cocktailShakerSort;
