import { sleep } from "../utils";

function mergeSort(stateArray, updateStateArray) {
  const indexRange = [0, stateArray.length - 1];
  return mergeSortHelper(stateArray, updateStateArray, ...indexRange);
}
async function mergeSortHelper(arr, setArray, startIdx, endIdx) {
  if (arr.length <= 1) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const leftHalf = await mergeSortHelper(
    arr.slice(0, mid),
    setArray,
    startIdx,
    startIdx + mid - 1
  );
  const rightHalf = await mergeSortHelper(
    arr.slice(mid),
    setArray,
    startIdx + mid,
    endIdx
  );
  const mergedSortedArrays = mergeArrays(leftHalf, rightHalf);

  for (let i = 0; i < mergedSortedArrays.length; i++) {
    setArray((arr) =>
      arr.map((val, idx) =>
        idx === startIdx + i ? mergedSortedArrays[i] : val
      )
    );
    await sleep(5);
  }

  return mergedSortedArrays;
}

function mergeArrays(leftHalf, rightHalf) {
  const sortedArr = [];

  let i = 0,
    j = 0;

  // merge two arrays into one sorted array
  while (i < leftHalf.length && j < rightHalf.length) {
    if (leftHalf[i] <= rightHalf[j]) {
      sortedArr.push(leftHalf[i++]);
    } else {
      sortedArr.push(rightHalf[j++]);
    }
  }
  return [...sortedArr, ...leftHalf.slice(i), ...rightHalf.slice(j)];
}

export { mergeSort };
