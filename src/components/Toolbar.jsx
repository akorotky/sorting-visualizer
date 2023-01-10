import React from "react";
import mergeSort from "../functions/sorting_algorithms/merge_sort";
import quickSort from "../functions/sorting_algorithms/quick_sort";
import { generateArray, shuffle } from "../functions/utils";
import "./Toolbar.css";

function Toolbar({ animationState, dispatchAnimation }) {
  function changeArraySize(e) {
    // target value is a string
    const newArraySize = parseInt(e.target.value);
    console.log(newArraySize);
    dispatchAnimation({
      type: "SET_ARRAY",
      payload: generateArray(newArraySize),
    });
  }

  function changeSortingSpeed(e) {
    const newSpeed = Math.floor(100 / parseInt(e.target.value));
    console.log(newSpeed);

    dispatchAnimation({
      type: "SET_SORTING_SPEED",
      payload: newSpeed,
    });
  }

  function shuffleArray(array) {
    dispatchAnimation({ type: "SET_ARRAY", payload: shuffle(array) });
    dispatchAnimation({ type: "SET_SORTED_STATE", payload: false });
  }

  async function sort(animationState, sortingFunction) {
    await sortingFunction(animationState, dispatchAnimation);
    dispatchAnimation({ type: "SET_SORTED_STATE", payload: true });
  }

  return (
    <div className="toolbar-container">
      <button onClick={() => shuffleArray(animationState.array)}>
        Shuffle Array
      </button>
      <button>Stop/Resume Sort</button>
      <div className="input">
        <label htmlFor="changeSize">Array Size</label>

        <input
          id="changeSize"
          type="range"
          min="5"
          max="450"
          onChange={changeArraySize}
        />
      </div>
      <div className="input">
        <label htmlFor="changeSpeed">Sorting Speed</label>

        <input
          id="changeSpeed"
          type="range"
          min="1"
          max="100"
          onChange={changeSortingSpeed}
        />
      </div>

      <button onClick={() => sort(animationState, quickSort)}>
        Quick Sort
      </button>
      <button onClick={() => sort(animationState, mergeSort)}>
        Merge Sort
      </button>
      <button onClick={() => resetArray(300)}>Heap Sort</button>
      <button onClick={() => resetArray(300)}>Bubble Sort</button>
      <button onClick={() => resetArray(300)}>Insertion Sort</button>
      <button onClick={() => resetArray(300)}>Selection Sort</button>
      <button onClick={() => resetArray(300)}>Tim Sort</button>
    </div>
  );
}

export default Toolbar;
