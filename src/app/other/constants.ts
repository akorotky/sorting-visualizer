import { SelectOption } from "../types";

const INITIAL_ANIMATION_DELAY: number = 31; // ms
const INITIAL_ARRAY_SIZE: number = 100;

const COLOR = {
  RED: "red",
  GREEN: "greenyellow",
  YELLOW: "gold",
  PURPLE: "blueviolet",
  SORTED: ["forestgreen", "green", "darkgreen"],
  DEFAULT: ["silver", "darkgray", "gray"],
};

const OPTIONS: SelectOption[] = [
  { label: "Quicksort", value: "quickSort" },
  { label: "Mergesort", value: "mergeSort" },
  { label: "Heapsort", value: "heapSort" },
  { label: "Insertion Sort", value: "insertionSort" },
  { label: "Bubble Sort", value: "bubbleSort" },
  { label: "Selection Sort", value: "selectionSort" },
  { label: "Shell Sort", value: "shellSort" },
  { label: "Cocktail Shaker Sort", value: "cocktailShakerSort" },
  { label: "Counting Sort", value: "countingSort" },
  { label: "Bitonic Sort", value: "bitonicSort" },
  { label: "Introsort 1", value: "introSort1" },
  { label: "Introsort 2", value: "introSort2" },
  { label: "Introsort 3", value: "introSort3" },
];

export { COLOR, INITIAL_ANIMATION_DELAY, INITIAL_ARRAY_SIZE, OPTIONS };
