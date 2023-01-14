import React, { useEffect, useState, useRef } from "react";
import { ACTIONS } from "../functions/animationReducer";
import { generateArray, shuffle, sleep } from "../functions/utils";
import * as Algorithms from "../functions/sorting_algorithms";
import "./Toolbar.css";

function Toolbar({ animationState, dispatchAnimation }) {
  const { animationArray, animationDelay } = animationState;
  const [isAnimationRunning, setIsAnimationRunning] = useState(false);
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);
  const animationGenerator = useRef();
  const canRender = useRef(false);

  function changeArraySize(e) {
    // target value is a string
    const newArraySize = parseInt(e.target.value);

    dispatchAnimation({
      type: ACTIONS.SET_ARRAY,
      payload: [...generateArray(newArraySize)],
    });
    dispatchAnimation({ type: ACTIONS.SET_SORTED_STATE, payload: false });
  }

  function changeSortingSpeed(e) {
    const newSpeed = 100 - parseInt(e.target.value);
    dispatchAnimation({ type: ACTIONS.SET_ANIMATION_DELAY, payload: newSpeed });
  }

  function shuffleArray(array) {
    // clear bar colors
    const indicesToClear = array.map((val, idx) => idx);
    dispatchAnimation({
      type: ACTIONS.CLEAR_INDEX_COLOR,
      payload: indicesToClear,
    });

    dispatchAnimation({
      type: ACTIONS.SET_ARRAY,
      payload: shuffle(array),
    });

    dispatchAnimation({ type: ACTIONS.SET_SORTED_STATE, payload: false });
  }

  // sorting animation loop
  useEffect(() => {
    const canAnimate =
      isAnimationRunning && !isAnimationPaused && canRender.current;
    if (canAnimate) {
      // must wait for the last animation to finish
      canRender.current = false;
      animateSort(animationArray, animationGenerator.current, animationDelay);
    }
  });

  function sort(array, sortingFunction) {
    setIsAnimationRunning(true);
    canRender.current = true;
    animationGenerator.current = sortingFunction(array);
  }

  async function animateSort(array, animationGenerator, delay) {
    const currentAnimation = animationGenerator.next().value;
    if (!currentAnimation) {
      dispatchAnimation({ type: ACTIONS.SET_SORTED_STATE, payload: true });
      animationGenerator = undefined;
      setIsAnimationRunning(false);
    } else {
      await sleep(delay);
      visualizeAnimation(currentAnimation, array, delay);
      canRender.current = true;
    }
  }

  function visualizeAnimation(animation, animationArray) {
    const { color, clearColor, replace } = animation;
    if (replace) {
      const [targetIdx, newVal] = animation.replace;
      const newAnimationArray = animationArray.map((val, idx) =>
        idx === targetIdx ? newVal : val
      );
      dispatchAnimation({
        type: ACTIONS.SET_ARRAY,
        payload: newAnimationArray,
      });
    }
    if (color) {
      dispatchAnimation({
        type: ACTIONS.SET_INDEX_COLOR,
        payload: animation.color,
      });
    }
    if (clearColor) {
      dispatchAnimation({
        type: ACTIONS.CLEAR_INDEX_COLOR,
        payload: animation.clearColor,
      });
    }
  }

  function pauseSorting() {
    setIsAnimationPaused(!isAnimationPaused);
  }

  return (
    <div className="toolbar-container">
      <button
        onClick={() => shuffleArray(animationArray)}
        disabled={isAnimationRunning}
      >
        Shuffle Array
      </button>
      <button onClick={pauseSorting} disabled={!isAnimationRunning}>
        Pause/Resume Sort
      </button>
      <div className="slider">
        <label htmlFor="changeSize">Array Size</label>
        <input
          id="changeSize"
          type="range"
          min="10"
          max="800"
          step="5"
          value={animationArray.length}
          onChange={changeArraySize}
          disabled={isAnimationRunning}
        />
        {animationArray.length}
      </div>
      <div className="slider">
        <label htmlFor="changeSpeed">Sorting Speed</label>
        <input
          id="changeSpeed"
          type="range"
          min="0"
          max="99"
          value={100 - animationDelay}
          onChange={changeSortingSpeed}
        />
        {100 - animationDelay} %
      </div>
      <button
        onClick={() => sort(animationArray, Algorithms.quickSort)}
        disabled={isAnimationRunning}
      >
        Quick Sort
      </button>
      <button
        onClick={() => sort(animationArray, Algorithms.mergeSort)}
        disabled={isAnimationRunning}
      >
        Merge Sort
      </button>
      <button
        onClick={() => sort(animationArray, Algorithms.heapSort)}
        disabled={isAnimationRunning}
      >
        Heap Sort
      </button>
      <button
        onClick={() => sort(animationArray, Algorithms.bubbleSort)}
        disabled={isAnimationRunning}
      >
        Bubble Sort
      </button>
      <button
        onClick={() => sort(animationArray, Algorithms.insertionSort)}
        disabled={isAnimationRunning}
      >
        Insertion Sort
      </button>
    </div>
  );
}

export default Toolbar;
