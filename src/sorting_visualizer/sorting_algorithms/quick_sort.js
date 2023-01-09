import { sleep } from "../utils";

// In-place Quicksort implementing Hoare partition
// with the middle element as the pivot

function quickSort(stateArray, updateStateArray) {
  const indexRange = [0, stateArray.length - 1];
  return quickSortHelper(stateArray, updateStateArray, ...indexRange);
}
async function quickSortHelper(array, setArray, startIdx, endIdx) {
  if (startIdx >= endIdx) {
    return [...array.slice(startIdx, endIdx)];
  }

  var pivotIdx = await partition(array, setArray, startIdx, endIdx);
  quickSortHelper(array, setArray, startIdx, pivotIdx);
  quickSortHelper(array, setArray, pivotIdx + 1, endIdx);
  return [...array];
}

async function partition(array, setArray, startIdx, endIdx) {
  // formula to avoid integer overflow
  const mid = Math.floor(startIdx + (endIdx - startIdx) / 2);
  const pivot = array[mid];
  let i = startIdx - 1,
    j = endIdx + 1;

  while (true) {
    do {
      i++;
    } while (array[i] < pivot);
    do {
      j--;
    } while (array[j] > pivot);

    if (i >= j) return j;

    await swap(array, setArray, i, j);
  }
}

async function swap(array, setArray, i, j) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;

  setArray([...array]);
  await sleep(100);
}

export { quickSort };
