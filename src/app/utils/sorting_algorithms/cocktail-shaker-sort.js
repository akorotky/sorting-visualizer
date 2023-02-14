import { swap } from "../common";

function* cocktailShakerSort(array) {
  let swapped = true;
  do {
    swapped = false;
    for (let i = 0; i < array.length - 2; i++) {
      if (array[i] > array[i + 1]) {
        yield* swap(array, i, i + 1);
        swapped = true;
      }
    }
    swapped = false;
    for (let i = array.length - 2; i >= 0; i--) {
      if (array[i] > array[i + 1]) {
        yield* swap(array, i, i + 1);
        swapped = true;
      }
    }
  } while (swapped);
}

export default cocktailShakerSort;
