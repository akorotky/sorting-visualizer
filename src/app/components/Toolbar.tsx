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
import { AnimationDispatcher, AnimationGenerator, GenFunction } from "../types";
import { generateArray, sleep } from "../utils/common";
import * as Algorithms from "../utils/sorting_algorithms";
import "./Toolbar.css";

function Toolbar() {
  const animation = useAppSelector((state) => state.animation);
  const dispatch = useAppDispatch();
  const [canRun, setCanRun] = useState<boolean>(true);
  const animationGenerator = useRef<AnimationGenerator | undefined>();
  const sortSelectionRef = useRef<HTMLSelectElement>(null);

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
    const selectedSort = sortSelectionRef.current?.value;
    const newArraySize =
      selectedSort === "bitonicSort"
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

  function sort(array: number[], sortingFunction: GenFunction) {
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
    currentAnimation: AnimationDispatcher | number,
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
      const selectedSort = sortSelectionRef.current?.value;
      if (selectedSort !== undefined)
        sort(arr, (Algorithms as { [key: string]: GenFunction })[selectedSort]);
    }
  }

  function sliderStep() {
    const selectedSort = sortSelectionRef.current?.value;
    return selectedSort === "bitonicSort" ? 1 : 5;
  }

  function sliderMinValue() {
    const selectedSort = sortSelectionRef.current?.value;
    return selectedSort === "bitonicSort" ? 3 : 10;
  }
  function sliderMaxValue() {
    const selectedSort = sortSelectionRef.current?.value;
    return selectedSort === "bitonicSort" ? 9 : 800;
  }

  function sliderValue(array: number[]) {
    const selectedSort = sortSelectionRef.current?.value;
    const value: string = (
      document.getElementById("sizeSlider") as HTMLInputElement
    )?.value;
    return selectedSort === "bitonicSort" ? value : array.length;
  }

  return (
    <div className="toolbar-container">
      <button
        className="toolbar-btn"
        onClick={() => shuffleAnimation(animation.array)}
        disabled={animation.isRunning || !canRun}
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
        className="toolbar-btn"
        onClick={() => handleAnimationRun(animation.array)}
        style={{ width: "5vw" }}
        disabled={!canRun}
      >
        {animation.isRunning ? "Stop" : ""} Sort
      </button>
      <div className="slider">
        <label htmlFor="sizeSlider">Array Size</label>
        <input
          id="sizeSlider"
          type="range"
          min={sliderMinValue()}
          max={sliderMaxValue()}
          step={sliderStep()}
          value={sliderValue(animation.array)}
          onChange={(e) => changeArraySize(e)}
          disabled={animation.isRunning || !canRun}
        ></input>
        {animation.array.length}
      </div>
      <div className="slider">
        <label htmlFor="speedSlider">Sorting Speed</label>
        <input
          id="speedSlider"
          type="range"
          min="0"
          max="99"
          value={100 - animation.delay}
          onChange={changeSortingSpeed}
        />
        {100 - animation.delay + 1} %
      </div>
      <select
        className="sort-select"
        ref={sortSelectionRef}
        disabled={animation.isRunning}
      >
        <option value="bubbleSort">Bubble Sort</option>
        <option value="cocktailShakerSort">Cocktail Shaker Sort</option>
        <option value="selectionSort">Selection Sort</option>
        <option value="insertionSort">Insertion Sort</option>
        <option value="shellSort">Shellsort</option>
        <option value="heapSort">Heapsort</option>
        <option value="mergeSort">Mergesort</option>""
        <option value="quickSort">Quicksort</option>
        <option value="bitonicSort">Bitonic Sort</option>
        <option value="countingSort">Counting Sort</option>
        <option value="introSort1">Introsort Bottom-Up</option>
        <option value="introSort2">Introsort Top-Down</option>
        <option value="introSort3">Introsort Insertion-Last</option>
      </select>
    </div>
  );
}

export default Toolbar;
