import React, { useEffect, useState } from "react";
import "./SortingVisualizer.css";
import { quickSort } from "./sorting_algorithms/quick_sort";
import { mergeSort } from "./sorting_algorithms/merge_sort";

function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  function resetArray(size) {
    const array = [];
    for (let i = 1; i < size + 1; i++) {
      array.push(i);
    }
    setIsSorted(false);
    setArray(shuffle(array));
  }
  useEffect(() => {
    resetArray(100);
  }, []);

  // Durstenfeld shuffle algorithm 
  function shuffle(array) {
    const shuffledArray = [...array];
    for (let i = 0; i < shuffledArray.length - 1; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  function sort(array, sortingFunction) {
    // create a sorted copy of the main array
    sortingFunction([...array], setArray);
    // setIsSorted(true)
    
    // const sortedArr = [...array].sort((a, b) => a - b);
    // if (array.every((val, idx) => val === sortedArr[idx])) {
    //   console.log("sorted");
    //   setIsSorted(true);
    // }
    // update the main array with the sorted copy
  }

  return (
    <>
      <button onClick={() => setArray(shuffle(array))}>Shuffle</button>
      <button onClick={() => resetArray(100)}>Generate a New Array</button>
      <button onClick={() => sort(array, quickSort)}>Quick Sort</button>
      <button onClick={() => sort(array, mergeSort)}>Merge Sort</button>
      <button onClick={() => resetArray(300)}>Heap Sort</button>
      <button onClick={() => resetArray(300)}>Bubble Sort</button>
      <button onClick={() => resetArray(300)}>Insertion Sort</button>
      <button onClick={() => resetArray(300)}>Selection Sort</button>
      <button onClick={() => resetArray(300)}>Tim Sort</button>

      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className={isSorted ? "array-sorted" : "array-bar"}
            style={{  height: `${value * 0.8}vh` }}
            key={idx}
          ></div>
        ))}
      </div>
    </>
  );
}

export default SortingVisualizer;
