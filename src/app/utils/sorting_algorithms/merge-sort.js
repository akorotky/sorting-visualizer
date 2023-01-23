import { COLOR } from "../../other/constants";

function* mergeSort(array) {
  yield* mergeSortHelper(array, [...array], 0, array.length - 1);
}
function* mergeSortHelper(array, auxiliaryArray, startIdx, endIdx) {
  if (endIdx <= startIdx) {
    return;
  }
  const midIdx = Math.floor((startIdx + endIdx) / 2);
  yield* mergeSortHelper(auxiliaryArray, array, startIdx, midIdx);
  yield* mergeSortHelper(auxiliaryArray, array, midIdx + 1, endIdx);
  yield* mergeLeftRight(array, auxiliaryArray, startIdx, midIdx, endIdx);
}

function* mergeLeftRight(array, auxiliaryArray, startIdx, midIdx, endIdx) {
  let i = startIdx,
    j = midIdx + 1,
    copyFromIdx = null;

  for (let k = startIdx; k <= endIdx; k++) {
    if (i <= midIdx && (j > endIdx || auxiliaryArray[i] <= auxiliaryArray[j])) {
      copyFromIdx = i;
      array[k] = auxiliaryArray[i++];
    } else {
      copyFromIdx = j;
      array[k] = auxiliaryArray[j++];
    }

    yield {
      color: [
        [k, COLOR.GREEN],
        [copyFromIdx, COLOR.RED],
      ],
    };

    yield { replace: [[k, auxiliaryArray[copyFromIdx]]] };
    yield { clearColor: [k, copyFromIdx] };
  }
}

export default mergeSort;
