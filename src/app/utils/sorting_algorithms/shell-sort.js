import { COLOR } from "../../other/constants";

function* shellSort(array) {
  // Ciura gap sequence
  const gaps = [701, 301, 132, 57, 23, 10, 4, 1];
  let i, j;
  for (const gap of gaps) {
    for (i = gap; i < array.length; i++) {
      const tmp = array[i];
      for (j = i; j >= gap && array[j - gap] > tmp; j -= gap) {
        array[j] = array[j - gap];
        yield { color: [[j, COLOR.RED]] };
        yield { replace: [[j, array[j - gap]]] };
        yield { clearColor: [j] };
      }
      array[j] = tmp;
      yield { color: [[j, COLOR.GREEN]] };
      yield { replace: [[j, tmp]] };
      yield { clearColor: [j] };
    }
  }
}

export default shellSort;
