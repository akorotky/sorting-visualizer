import { COLOR } from "../other/constants";

// Durstenfeld shuffle algorithm
function shuffle(array) {
  const shuffledArray = [...array];
  for (let i = 0; i < shuffledArray.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return [...shuffledArray];
}

function generateArray(size) {
  const newArray = [];
  for (let i = 1; i < size + 1; i++) {
    newArray.push(i);
  }
  return shuffle(newArray);
}

function getRandomIntFromRange(min, max) {
  const intMin = Math.ceil(min);
  const intMax = Math.floor(max);
  return Math.floor(Math.random() * (intMax - intMin + 1) + intMin);
}

function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

function* swap(array, i, j) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;

  yield {
    color: [
      [i, COLOR.RED],
      [j, COLOR.GREEN],
    ],
  };

  yield {
    replace: [
      [i, array[i]],
      [j, array[j]],
    ],
  };

  yield { clearColor: [i, j] };
}

function* partition(array, startIdx, endIdx) {
  // set pivot index
  const mid = Math.floor(startIdx + (endIdx - startIdx) / 2);

  yield { color: [[mid, COLOR.YELLOW]] };

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

    if (i >= j) {
      // clear pivot
      yield { clearColor: [mid] };
      return j;
    }

    yield* swap(array, i, j);
    yield { color: [[mid, COLOR.YELLOW]] };
  }
}

function logBase2(num) {
  return Math.floor(Math.log(num) / Math.log(2));
}

export {
  getRandomIntFromRange,
  sleep,
  generateArray,
  shuffle,
  swap,
  partition,
  logBase2,
};
