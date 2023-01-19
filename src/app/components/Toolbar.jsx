import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setArray,
  setIsSorted,
  setIndexColor,
  clearIndexColor,
  setDelay,
  setIsRunning,
  setIsPaused,
} from "../features/animationSlice";

import { generateArray, shuffle } from "../utils/common";
import * as Algorithms from "../utils/sorting_algorithms";
import "./Toolbar.css";

function Toolbar(props) {
  const animation = useSelector((state) => state.animation);
  const dispatch = useDispatch();

  const animationGenerator = useRef();
  const sortSelectionRef = useRef();

  function changeArraySize(e) {
    // target value is a string
    const newArraySize = parseInt(e.target.value);

    dispatch(setArray(generateArray(newArraySize)));
    dispatch(setIsSorted(false));
  }

  function changeSortingSpeed(e) {
    const newSpeed = 100 - parseInt(e.target.value);

    dispatch(setDelay(newSpeed));
  }

  function shuffleArray(array) {
    // clear bar colors
    resetColors(array);
    dispatch(setArray(shuffle(array)));
    dispatch(setIsSorted(false));
  }

  // sorting animation loop
  useEffect(() => {
    const canAnimate = animation.isRunning && !animation.isPaused;
    if (canAnimate) {
      const animationID = setInterval(() => {
        animateSort(
          animation.array,
          animationGenerator.current,
          animation.delay
        );
      }, animation.delay);
      return () => clearInterval(animationID);
    }
  }, [animation]);

  function sort(array, sortingFunction) {
    dispatch(setIsRunning(true));
    animationGenerator.current = sortingFunction([...array]);
  }

  function animateSort(array, animationGenerator) {
    const currentAnimation = animationGenerator.next().value;
    if (!currentAnimation) {
      dispatch(setIsSorted(true));
      dispatch(setIsRunning(false));
      animationGenerator = undefined;
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

  return (
    <div className="toolbar-container">
      <button
        className="toolbar-btn"
        onClick={() => shuffleArray(animation.array)}
        disabled={animation.isRunning}
      >
        Shuffle Array
      </button>
      <button
        className="toolbar-btn"
        onClick={pauseSorting}
        disabled={!animation.isRunning}
      >
        {animation.isPaused ? "Resume" : "Pause"} Sort
      </button>
      <button
        className="toolbar-btn"
        onClick={
          animation.isRunning
            ? () => stopAnimation(animation.array)
            : () =>
                sort(
                  animation.array,
                  Algorithms[sortSelectionRef.current.value]
                )
        }
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
        <option value="quickSort">Quick Sort</option>
        <option value="mergeSort">Merge Sort</option>
        <option value="heapSort">Heap Sort</option>
        <option value="bubbleSort">Bubble Sort</option>
        <option value="insertionSort">Insertion Sort</option>
      </select>
    </div>
  );
}

export default Toolbar;
