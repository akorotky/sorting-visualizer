import { sleep } from "../utils";

// In-place Quicksort implementing Hoare partition
// using the middle element as the pivot

async function quickSort(animation, dispatchAnimation) {
  const indexRange = [0, animation.array.length - 1];
  return await quickSortHelper(
    animation.array,
    ...indexRange,
    dispatchAnimation,
    animation.sortingSpeed
  );
}
async function quickSortHelper(
  array,
  startIdx,
  endIdx,
  dispatchAnimation,
  speed
) {
  if (startIdx >= endIdx) {
    return;
  }

  var pivotIdx = await partition(
    array,
    startIdx,
    endIdx,
    dispatchAnimation,
    speed
  );
  dispatchAnimation({ type: "SET_PIVOT_INDEX", payload: null });
  await quickSortHelper(array, startIdx, pivotIdx, dispatchAnimation, speed);
  await quickSortHelper(array, pivotIdx + 1, endIdx, dispatchAnimation, speed);
  return [...array];
}

async function partition(array, startIdx, endIdx, dispatchAnimation, speed) {
  // formula to avoid integer overflow
  const mid = Math.floor(startIdx + (endIdx - startIdx) / 2);

  dispatchAnimation({ type: "SET_PIVOT_INDEX", payload: mid });
  await sleep(speed);

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

    await swap(array, i, j, dispatchAnimation, speed);
  }
}

async function swap(array, i, j, dispatchAnimation, speed) {
  const tmp = array[i];
  array[i] = array[j];
  dispatchAnimation({ type: "SET_ACTIVE_INDEX", payload: i });
  dispatchAnimation({ type: "SET_ARRAY", payload: [...array] });

  await sleep(speed);

  array[j] = tmp;
  dispatchAnimation({ type: "SET_ACTIVE_INDEX", payload: j });
  dispatchAnimation({ type: "SET_ARRAY", payload: [...array] });

  await sleep(speed);

  dispatchAnimation({ type: "SET_ACTIVE_INDEX", payload: null });

  await sleep(speed);
}

export default quickSort;
