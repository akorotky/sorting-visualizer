import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  setArray,
  setIndexColor,
  clearIndexColor,
  setDelay,
  setIsRunning,
  setIsPaused,
} from "../features/animation-slice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { COLOR } from "../other/constants";
import {
  AnimationGenerator,
  AnimationGeneratorFunction,
  SelectOption,
  TAnimation,
} from "../types";
import { generateArray, sleep } from "../utils/common";
import * as Algorithms from "../utils/sorting_algorithms";
import "./Toolbar.css";
import Select from "./Select";

function Toolbar() {
  const animation = useAppSelector((state) => state.animation);
  const dispatch = useAppDispatch();
  const [canRun, setCanRun] = useState<boolean>(true);
  const animationGenerator = useRef<AnimationGenerator | undefined>();

  const options: SelectOption[] = [
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

  const [selectedSort, setSelectedSort] = useState<SelectOption>(options[0]);

  // sorting animation loop
  useEffect(() => {
    const canAnimate = animation.isRunning && !animation.isPaused;
    if (canAnimate) {
      const animationID = setInterval(() => {
        animateSort(animation.array, animationGenerator.current);
      }, animation.delay);
      return () => clearInterval(animationID);
    }
  }, [animation]);

  function getShuffleDelay(arraySize: number): number {
    return (20 * 100) / arraySize;
  }
  function getSortedDelay(arraySize: number): number {
    return (10 * 100) / arraySize;
  }

  async function sortedAnimation(array: number[]) {
    setCanRun(false);

    const delay = getSortedDelay(array.length);
    const animatedAreaRange = Math.floor(array.length / 5);

    for (let i = 0; i < array.length + animatedAreaRange; i++) {
      if (i - animatedAreaRange >= 0) {
        dispatch(clearIndexColor([i - animatedAreaRange]));
      }
      if (i < array.length) {
        const toDispatch: [number, string][] = [[i, COLOR.SORTED[i % 3]]];
        dispatch(setIndexColor(toDispatch));
      }
      await sleep(delay);
    }
    resetColors(array);
    setCanRun(true);
  }

  async function shuffleAnimation(array: number[]) {
    resetColors(array);
    setCanRun(false);

    const delay = getShuffleDelay(array.length);
    const shuffledArray = [...array];

    for (let i = 0; i < array.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));

      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];

      const toDispatch: [number, string][] = [
        [i, COLOR.GREEN],
        [j, COLOR.RED],
      ];
      dispatch(setIndexColor(toDispatch));

      await sleep(delay);

      dispatch(setArray([...shuffledArray]));
      dispatch(clearIndexColor([i, j]));
    }
    setCanRun(true);
  }

  function changeArraySize(e: ChangeEvent<HTMLInputElement>) {
    // target value is a string
    const sliderValue = parseInt(e.target.value);
    const newArraySize =
      selectedSort.value === "bitonicSort"
        ? sliderValue < 10
          ? 2 ** sliderValue
          : 128
        : sliderValue;
    dispatch(setArray(generateArray(newArraySize)));
  }

  function changeSortingSpeed(e: ChangeEvent<HTMLInputElement>) {
    const newSpeed = 100 - parseInt(e.target.value);

    dispatch(setDelay(newSpeed));
  }

  function sort(array: number[], sortingFunction: AnimationGeneratorFunction) {
    animationGenerator.current = sortingFunction([...array]);
    dispatch(setIsRunning(true));
  }

  function animateSort(
    array: number[],
    animationGenerator: AnimationGenerator | undefined
  ) {
    const currentAnimation = animationGenerator?.next();
    if (currentAnimation === undefined || currentAnimation.done) {
      stopAnimation(array);
      sortedAnimation(array);
    } else {
      visualizeAnimation(currentAnimation.value, array);
    }
  }

  function visualizeAnimation(
    currentAnimation: TAnimation | number,
    animationArray: number[]
  ) {
    if (typeof currentAnimation === "number") {
      return;
    }

    if (currentAnimation.toReplace !== undefined) {
      const newAnimationArray = [...animationArray];
      currentAnimation.toReplace.forEach((pair) => {
        const [targetIdx, newVal] = pair;
        newAnimationArray[targetIdx] = newVal;
      });

      dispatch(setArray(newAnimationArray));
    }
    if (currentAnimation.toColor !== undefined) {
      dispatch(setIndexColor(currentAnimation.toColor));
    }
    if (currentAnimation.toClear !== undefined) {
      dispatch(clearIndexColor(currentAnimation.toClear));
    }
  }

  function pauseSorting() {
    dispatch(setIsPaused(!animation.isPaused));
  }

  function stopAnimation(arr: number[]) {
    animationGenerator.current = undefined;
    resetColors(arr);
    dispatch(setIsRunning(false));
    dispatch(setIsPaused(false));
  }

  function resetColors(arr: number[]) {
    const indicesToClear = arr.map((val, idx) => idx);
    dispatch(clearIndexColor(indicesToClear));
  }

  function handleAnimationRun(arr: number[]) {
    if (animation.isRunning) {
      stopAnimation(arr);
    } else {
      if (selectedSort.value !== undefined)
        sort(
          arr,
          (Algorithms as { [key: string]: AnimationGeneratorFunction })[
            selectedSort.value
          ]
        );
    }
  }

  function sliderStep() {
    return selectedSort.value === "bitonicSort" ? 1 : 5;
  }

  function sliderMinValue() {
    return selectedSort.value === "bitonicSort" ? 3 : 10;
  }
  function sliderMaxValue() {
    return selectedSort.value === "bitonicSort" ? 9 : 800;
  }

  function sliderValue(array: number[]) {
    const value: string = (
      document.getElementById("sizeSlider") as HTMLInputElement
    )?.value;
    return selectedSort.value === "bitonicSort" ? value : array.length;
  }

  return (
    <div className="toolbar-container">
      <button
        className={`toolbar-btn ${
          animation.isRunning || !canRun ? "disabled" : ""
        }`}
        onClick={() => shuffleAnimation(animation.array)}
      >
        Shuffle Array
      </button>
      <button
        className="toolbar-btn"
        onClick={pauseSorting}
        disabled={!animation.isRunning}
        style={{ width: "6vw" }}
      >
        {animation.isPaused ? "Resume" : "Pause"} Sort
      </button>
      <button
        className={`toolbar-btn ${!canRun ? "disabled" : ""}`}
        onClick={() => handleAnimationRun(animation.array)}
        style={{ width: "5vw" }}
      >
        {animation.isRunning ? "Stop" : ""} Sort
      </button>
      <div className="slider-container">
        <label htmlFor="sizeSlider">Array Size</label>
        <input
          className={`slider ${
            animation.isRunning || !canRun ? "disabled" : ""
          }`}
          id="sizeSlider"
          type="range"
          min={sliderMinValue()}
          max={sliderMaxValue()}
          step={sliderStep()}
          value={sliderValue(animation.array)}
          onChange={(e) => changeArraySize(e)}
        ></input>
        {animation.array.length}
      </div>
      <div className="slider-container">
        <label htmlFor="speedSlider">Sorting Speed</label>
        <input
          className="slider"
          id="speedSlider"
          type="range"
          min="0"
          max="99"
          value={100 - animation.delay}
          onChange={changeSortingSpeed}
        />
        {100 - animation.delay + 1}%
      </div>
      <Select
        options={options}
        value={selectedSort}
        onChange={(option) => setSelectedSort(option)}
        disabled={animation.isRunning}
      ></Select>
    </div>
  );
}

export default Toolbar;
