import { COLOR } from "../constants";

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

  yield { replace: [i, array[i]] };
  yield { replace: [j, array[j]] };

  yield { clearColor: [i, j] };
}
export { getRandomIntFromRange, sleep, generateArray, shuffle, swap };
