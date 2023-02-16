import { COLOR } from "../../other/constants";
import { AnimationGenerator, colorIndices, replaceIndices } from "../../types";

function* countingSort(arr: number[]): AnimationGenerator {
  const k = Math.max(...arr);

  const count = new Array(k + 1).fill(0);

  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;
    yield colorIndices([[i, COLOR.RED]]);
  }

  let i, j;
  i = j = 0;
  while (i < arr.length) {
    if (count[j] === 0) {
      j++;
      continue;
    }
    arr[i] = j;
    yield colorIndices([[i, COLOR.GREEN]]);
    yield replaceIndices([[i, j]]);
    yield colorIndices([[i, COLOR.PURPLE]]);
    i++;
    count[j]--;
  }
}

export default countingSort;
