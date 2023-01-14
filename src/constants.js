const INITIAL_ANIMATION_DELAY = 30; // ms
const INITIAL_ARRAY_SIZE = 100;

const BAR_WIDTH_RATIO = (arrayLength) => 100 / arrayLength;
const BAR_HEIGHT_RATIO = (arrayLength) => BAR_WIDTH_RATIO(arrayLength) / 1.4;

const COLOR = {
  RED: "red",
  GREEN: "greenyellow",
  YELLOW: "gold",
  PURPLE: "blueviolet",
  SORTED: ["forestgreen", "green", "darkgreen"],
  DEFAULT: ["silver", "darkgray", "gray"],
};

export {
  COLOR,
  INITIAL_ANIMATION_DELAY,
  INITIAL_ARRAY_SIZE,
  BAR_WIDTH_RATIO,
  BAR_HEIGHT_RATIO,
};
