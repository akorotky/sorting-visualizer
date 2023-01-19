import { COLOR } from "../../other/constants";
import { swap } from "../common";

function* insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    yield { color: [[i, COLOR.PURPLE]] };
    for (let j = i; j > 0; j--) {
      if (array[j] < array[j - 1]) {
        yield* swap(array, j - 1, j);
        yield { color: [[i, COLOR.PURPLE]] };
      } else break;
    }

    yield { clearColor: [i] };
  }
}

export default insertionSort;
