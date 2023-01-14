import { COLOR } from "../../constants";

function* insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    yield { color: [[i, COLOR.GREEN]] };
    for (let j = i; j > 0; j--) {
      if (array[j] < array[j - 1]) {
        yield* swap(array, j - 1, j);
      } else break;
    }
    yield { clearColor: [i] };
  }
}

function* swap(array, i, j) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;

  yield {
    color: [
      [i, COLOR.RED]
    ],
  };

  yield { replace: [i, array[i]] };
  yield { replace: [j, array[j]] };

  yield { clearColor: [i] };
}
export default insertionSort;
