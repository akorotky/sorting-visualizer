import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setArray,
  setIndexColor,
  clearIndexColor,
  setDelay,
  setIsRunning,
  setIsPaused,
} from "../features/animation-slice";
import { COLOR } from "../other/constants";

import { generateArray, sleep } from "../utils/common";
import * as Algorithms from "../utils/sorting_algorithms";
import "./Toolbar.css";

function Toolbar(props) {
  const animation = useSelector((state) => state.animation);
  const dispatch = useDispatch();
  const [canRun, setCanRun] = useState(true);
  const animationGenerator = useRef();
  const sortSelectionRef = useRef();

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

  function getShuffleDelay(arraySize) {
    return (20 * 100) / arraySize;
  }
  function getSortedDelay(arraySize) {
    return (10 * 100) / arraySize;
  }

  async function sortedAnimation(array) {
    setCanRun(false);

    const delay = getSortedDelay(array.length);
    const animatedAreaRange = Math.floor(array.length / 5);

    for (let i = 0; i < array.length + animatedAreaRange; i++) {
      if (i - animatedAreaRange >= 0) {
        dispatch(clearIndexColor([i - animatedAreaRange]));
      }
      if (i < array.length) {
        const toDispatch = [[i, COLOR.SORTED[i % 3]]];
        dispatch(setIndexColor(toDispatch));
      }
      await sleep(delay);
    }
    resetColors(array);
    setCanRun(true);
  }

  async function shuffleAnimation(array) {
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

      const toDispatch = [
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

  function changeArraySize(e) {
    // target value is a string
    const newArraySize = parseInt(e.target.value);

    dispatch(setArray(generateArray(newArraySize)));
  }

  function changeSortingSpeed(e) {
    const newSpeed = 100 - parseInt(e.target.value);

    dispatch(setDelay(newSpeed));
  }

  function sort(array, sortingFunction) {
    animationGenerator.current = sortingFunction([...array]);
    dispatch(setIsRunning(true));
  }

  function animateSort(array, animationGenerator) {
    const currentAnimation = animationGenerator.next().value;
    if (!currentAnimation) {
      stopAnimation(array);
      sortedAnimation(array);
    } else {
      visualizeAnimation(currentAnimation, array);
    }
  }

  function visualizeAnimation(currentAnimation, animationArray) {
    const { color, clearColor, replace } = currentAnimation;
    if (replace) {
      const newAnimationArray = [...animationArray];
      replace.forEach((pair) => {
        const [targetIdx, newVal] = pair;
        newAnimationArray[targetIdx] = newVal;
      });

      dispatch(setArray(newAnimationArray));
    }
    if (color) {
      dispatch(setIndexColor(color));
    }
    if (clearColor) {
      dispatch(clearIndexColor(clearColor));
    }
  }

  function pauseSorting() {
    dispatch(setIsPaused(!animation.isPaused));
  }

  function stopAnimation(array) {
    animationGenerator.current = undefined;
    resetColors(array);
    dispatch(setIsRunning(false));
    dispatch(setIsPaused(false));
  }

  function resetColors(array) {
    const indicesToClear = array.map((val, idx) => idx);
    dispatch(clearIndexColor(indicesToClear));
  }

  function handleAnimationRun(array) {
    if (animation.isRunning) {
      stopAnimation(array);
    } else {
      const selectedSort = sortSelectionRef.current.value;
      sort(array, Algorithms[selectedSort]);
    }
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
        <label htmlFor="changeSize">Array Size</label>
        <input
          id="changeSize"
          type="range"
          min="10"
          max="800"
          step="5"
          value={animation.array.length}
          onChange={changeArraySize}
          disabled={animation.isRunning}
        />
        {animation.array.length}
      </div>
      <div className="slider">
        <label htmlFor="changeSpeed">Sorting Speed</label>
        <input
          id="changeSpeed"
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
        <option value="selectionSort">Selection Sort</option>
        <option value="insertionSort">Insertion Sort</option>
        <option value="heapSort">Heapsort</option>
        <option value="mergeSort">Mergesort</option>
        <option value="quickSort">Quicksort</option>
        <option value="countingSort">Counting Sort</option>
        <option value="introSort1">Introsort Bottom-Up</option>
        <option value="introSort2">Introsort Top-Down</option>
        <option value="introSort3">Introsort Insertion-Last</option>
      </select>
    </div>
  );
}

export default Toolbar;
