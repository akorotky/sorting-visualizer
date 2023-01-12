import React, { useState } from "react";
import { ACTIONS } from "../functions/animationReducer";
import bubbleSort from "../functions/sorting_algorithms/bubble_sort";
import heapSort from "../functions/sorting_algorithms/heap_sort";
import insertionSort from "../functions/sorting_algorithms/insertion_sort";
import mergeSort from "../functions/sorting_algorithms/merge_sort";
import quickSort from "../functions/sorting_algorithms/quick_sort";
import { generateArray, shuffle } from "../functions/utils";
import "./Toolbar.css";

function Toolbar({ animationState, dispatchAnimation }) {
  const [isSorting, setIsSorting] = useState(false);
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
    const newSpeed = Math.floor(100 / parseInt(e.target.value));
    dispatchAnimation({
      type: ACTIONS.SET_SORTING_SPEED,
      payload: newSpeed,
    });
  }

  function shuffleArray(array) {
    // clear bar colors
    const indicesToClear = animationState.array.map((val, idx) => idx);
    dispatchAnimation({
      type: ACTIONS.CLEAR_INDEX_COLOR,
      payload: indicesToClear
    });

    dispatchAnimation({ type: ACTIONS.SET_ARRAY, payload: shuffle(array) });

    dispatchAnimation({ type: ACTIONS.SET_SORTED_STATE, payload: false });
  }

  async function sort(animationState, sortingFunction) {
    setIsSorting(true);
    await sortingFunction(animationState, dispatchAnimation);
    setIsSorting(false);
    console.log(animationState.array);
    dispatchAnimation({ type: ACTIONS.SET_SORTED_STATE, payload: true });
  }

  return (
    <div className="toolbar-container">
      <button onClick={() => shuffleArray(animationState.array)}>
        Shuffle Array
      </button>
      <button>Pause/Resume Sort</button>
      <div className="input">
        <label htmlFor="changeSize">Array Size</label>
        <input
          id="changeSize"
          type="range"
          min="10"
          max="700"
          value={animationState.array.length}
          onChange={changeArraySize}
          disabled={isSorting}
        />
        Current: {animationState.array.length}
      </div>
      <div className="input">
        <label htmlFor="changeSpeed">Sorting Speed</label>
        <input
          id="changeSpeed"
          type="range"
          min="1"
          max="51"
          value={Math.floor(100 / animationState.animationDelay)}
          onChange={changeSortingSpeed}
          disabled={isSorting}
        />
      </div>

      <button
        onClick={() => sort(animationState, quickSort)}
        disabled={isSorting}
      >
        Quick Sort
      </button>
      <button
        onClick={() => sort(animationState, mergeSort)}
        disabled={isSorting}
      >
        Merge Sort
      </button>
      <button
        onClick={() => sort(animationState, heapSort)}
        disabled={isSorting}
      >
        Heap Sort
      </button>
      <button
        onClick={() => sort(animationState, bubbleSort)}
        disabled={isSorting}
      >
        Bubble Sort
      </button>
      <button
        onClick={() => sort(animationState, insertionSort)}
        disabled={isSorting}
      >
        Insertion Sort
      </button>
      <button onClick={() => resetArray(300)} disabled={isSorting}>
        Selection Sort
      </button>
      <button onClick={() => resetArray(300)} disabled={isSorting}>
        Tim Sort
      </button>
    </div>
  );
}

export default Toolbar;
