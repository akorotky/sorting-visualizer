function getRandomIntFromRange(min, max) {
    const intMin = Math.ceil(min);
    const intMax = Math.floor(max);
    return Math.floor(Math.random() * (intMax - intMin + 1) + intMin);
}

function sleep(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

export {getRandomIntFromRange, sleep}