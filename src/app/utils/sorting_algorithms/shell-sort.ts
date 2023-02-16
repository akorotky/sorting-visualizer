import { COLOR } from "../../other/constants";
import {
  AnimationGenerator,
  clearIndices,
  colorIndices,
  replaceIndices,
} from "../../types";

function* shellSort(arr: number[]): AnimationGenerator {
  // Ciura gap sequence
  const gaps = [701, 301, 132, 57, 23, 10, 4, 1];
  let i, j;
  for (const gap of gaps) {
    for (i = gap; i < arr.length; i++) {
      const tmp = arr[i];
      for (j = i; j >= gap && arr[j - gap] > tmp; j -= gap) {
        arr[j] = arr[j - gap];
        yield colorIndices([[j, COLOR.RED]]);
        yield replaceIndices([[j, arr[j - gap]]]);
        yield clearIndices([j]);
      }
      arr[j] = tmp;
      yield colorIndices([[j, COLOR.GREEN]]);
      yield replaceIndices([[j, tmp]]);
      yield clearIndices([j]);
    }
  }
}

export default shellSort;
