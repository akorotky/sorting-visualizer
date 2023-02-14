import { swap } from "../common";

function* bitonicSort(arr) {
  for (let k = 2; k <= arr.length; k *= 2)
    for (let j = k / 2; j > 0; j /= 2)
      for (let i = 0; i < arr.length; i++) {
        let l = i ^ j;
        if (l > i)
          if (
            ((i & k) == 0 && arr[i] > arr[l]) ||
            ((i & k) != 0 && arr[i] < arr[l])
          )
            yield* swap(arr, i, l);
      }
}

export default bitonicSort;
