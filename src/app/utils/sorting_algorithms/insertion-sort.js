import { COLOR } from "../../other/constants";
import { swap } from "../common";

function* insertionSort(array, startIdx = 0, endIdx = array.length - 1) {
  for (let i = startIdx + 1; i <= endIdx; i++) {
    yield { color: [[i, COLOR.PURPLE]] };
    for (let j = i; j > startIdx; j--) {
      if (array[j] < array[j - 1]) {
        yield* swap(array, j - 1, j);
        yield { color: [[i, COLOR.PURPLE]] };
      } else break;
    }
    yield { clearColor: [i] };
  }
}

export default insertionSort;
