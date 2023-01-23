import { COLOR } from "../../other/constants";
import { swap } from "../common";

function* selectionSort(array, startIdx = 0, endIdx = array.length - 1) {
  let i, j, minIdx;

  for (i = startIdx; i < endIdx; i++) {
    minIdx = i;
    for (j = i + 1; j <= endIdx; j++) {
      if (array[j] < array[minIdx]) minIdx = j;
    }
    
    yield* swap(array, minIdx, i);
    yield { color: [[i, COLOR.PURPLE]] };
  }
}
export default selectionSort;
