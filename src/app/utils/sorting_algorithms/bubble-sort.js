import { COLOR } from "../../other/constants";
import { swap } from "../common";

function* bubbleSort(array) {
  let isSorted = false;
  let sortedIdx = 0;
  while (!isSorted) {
    isSorted = true;
    for (let i = 1; i < array.length - sortedIdx; i++) {
      if (array[i] < array[i - 1]) {
        yield * swap(array, i - 1, i);
        isSorted = false;
      }
    }
    sortedIdx++;
    yield { color: [[array.length - sortedIdx, COLOR.PURPLE]] };
  }
}

export default bubbleSort;
