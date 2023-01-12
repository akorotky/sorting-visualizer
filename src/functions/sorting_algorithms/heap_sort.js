

async function heapSort(animation, dispatchAnimation) {
  await heapSortHelper(
    animation.array,
    dispatchAnimation,
    animation.animationDelay
  );
  return animation.array;
}
async function heapSortHelper(array, dispatchAnimation, delay) {
  let size = array.length;

  for (let i = Math.floor(size / 2 - 1); i >= 0; i--)
    await heapify(array, size, i, dispatchAnimation, delay);

  for (let i = size - 1; i >= 0; i--) {
    await swap(array, 0, i, dispatchAnimation, delay);
    await heapify(array, i, 0, dispatchAnimation, delay);
  }
}

async function heapify(array, size, i, dispatchAnimation, delay) {
  let max = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < size && array[left] > array[max]) max = left;

  if (right < size && array[right] > array[max]) max = right;

  if (max != i) {
    await swap(array, i, max, dispatchAnimation, delay);
    await heapify(array, size, max, dispatchAnimation, delay);
  }
}

export default heapSort;
