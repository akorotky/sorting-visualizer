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
  const sortSelectionRef = useRef();
  const canStopAnimation = useRef(false);

  function changeArraySize(e) {
    // target value is a string
    const newArraySize = parseInt(e.target.value);

    dispatchAnimation({
      type: ACTIONS.SET_ARRAY,
      payload: generateArray(newArraySize),
    });
    dispatchAnimation({ type: ACTIONS.SET_SORTED_STATE, payload: false });
  }

  function changeSortingSpeed(e) {
    const newSpeed = 100 - parseInt(e.target.value);
    dispatchAnimation({ type: ACTIONS.SET_ANIMATION_DELAY, payload: newSpeed });
  }

  function shuffleArray(array) {
    // clear bar colors
    resetColors(array);

    dispatchAnimation({
      type: ACTIONS.SET_ARRAY,
      payload: shuffle(array),
    });

    dispatchAnimation({ type: ACTIONS.SET_SORTED_STATE, payload: false });
  }
  useEffect(() => {
    if (canStopAnimation.current) reset(animationArray);
  }, [animationArray]);

  // sorting animation loop
  useEffect(() => {
    const canAnimate =
      isAnimationRunning && !isAnimationPaused && canRender.current;
    if (canAnimate) {
      // must wait for the last animation to finish
      canRender.current = false;
      animateSort(
        animationState.animationArray,
        animationGenerator.current,
        animationDelay
      );
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

  function reset(array) {
    canStopAnimation.current = false;
    resetColors(array);
    setIsAnimationRunning(false);
    setIsAnimationPaused(false);
  }

  function stopAnimation() {
    canStopAnimation.current = true;
  }

  function resetColors(array) {
    const indicesToClear = array.map((val, idx) => idx);
    dispatchAnimation({
      type: ACTIONS.CLEAR_INDEX_COLOR,
      payload: indicesToClear,
    });
  }

  return (
    <div className="toolbar-container">
      <button
        className="toolbar-btn"
        onClick={() => shuffleArray(animationArray)}
        disabled={isAnimationRunning}
      >
        Shuffle Array
      </button>

      <button
        className="toolbar-btn"
        onClick={stopAnimation}
        disabled={!isAnimationRunning}
      >
        Stop Sort
      </button>
      <button
        className="toolbar-btn"
        onClick={pauseSorting}
        disabled={!isAnimationRunning}
      >
        Pause/Resume Sort
      </button>
      <button
        className="toolbar-btn"
        onClick={() =>
          sort(animationArray, Algorithms[sortSelectionRef.current.value])
        }
        disabled={isAnimationRunning}
      >
        Sort
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
        {100 - animationDelay + 1} %
      </div>
      <select
        className="sort-select"
        ref={sortSelectionRef}
        disabled={isAnimationRunning}
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
