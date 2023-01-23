import { COLOR } from "../../other/constants";

function* countingSort(array) {
  const k = Math.max(...array);

  const count = new Array(k + 1).fill(0);

  for (let i = 0; i < array.length; i++) {
    count[array[i]]++;
    yield { color: [[i, COLOR.RED]] };
  }

  let i, j;
  i = j = 0;
  while (i < array.length) {
    if (count[j] === 0) {
      j++;
      continue;
    }
    array[i] = j;
    yield { color: [[i, COLOR.GREEN]] };
    yield { replace: [[i, j]] };
    yield { color: [[i, COLOR.PURPLE]] };
    i++;
    count[j]--;
  }
}

export default countingSort;
