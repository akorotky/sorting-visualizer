import { setCurrentSort } from "../../features/animation-slice";
import { useAppDispatch } from "../../hooks";
import useAnimation from "../../hooks/useAnimation";
import { OPTIONS } from "../../other/constants";
import { SelectOption } from "../../types";
import * as Algorithms from "../../utils/sorting_algorithms";
import Select from "../Select";
import styles from "./toolbar.module.css";

function Toolbar() {
  const dispatch = useAppDispatch();
  const {
    state: animation,
    pause: pauseAnimation,
    shuffle: shuffleAnimation,
    handle: handleAnimationRun,
    canRun: canRun,
    changeSize: changeArraySize,
    changeSpeed: changeSortingSpeed,
  } = useAnimation();

  const currentSort = animation.currentSort;

  function sliderStep(currentSort: SelectOption) {
    return currentSort.value === "bitonicSort" ? 1 : 5;
  }

  function sliderMinValue(currentSort: SelectOption) {
    return currentSort.value === "bitonicSort" ? 3 : 10;
  }
  function sliderMaxValue(currentSort: SelectOption) {
    return currentSort.value === "bitonicSort" ? 9 : 800;
  }

  function sliderValue(currentSort: SelectOption, array: number[]) {
    const value: string = (
      document.getElementById("sizeSlider") as HTMLInputElement
    )?.value;
    return currentSort.value === "bitonicSort" ? value : array.length;
  }

  function changeSort(selectedSort: SelectOption) {
    dispatch(setCurrentSort(selectedSort));
  }

  return (
    <div className={styles["toolbar-container"]}>
      <button
        className={`${styles["toolbar-btn"]} ${
          animation.isRunning || !canRun ? styles.disabled : ""
        }`}
        onClick={() => shuffleAnimation(animation.array)}
      >
        Shuffle Array
      </button>
      <button
        className={`${styles["toolbar-btn"]} ${
          !animation.isRunning ? styles.disabled : ""
        }`}
        onClick={(e) => pauseAnimation()}
      >
        {animation.isPaused ? "Resume" : "Pause"} Sort
      </button>
      <button
        className={`${styles["toolbar-btn"]} ${!canRun ? styles.disabled : ""}`}
        onClick={() =>
          handleAnimationRun(
            animation.isRunning,
            animation.array,
            animation.currentSort,
            Algorithms
          )
        }
      >
        {animation.isRunning ? "Stop" : ""} Sort
      </button>
      <div className={styles["slider-container"]}>
        <label htmlFor="sizeSlider">Array Size</label>
        <input
          className={`${styles.slider} ${
            animation.isRunning || !canRun ? styles.disabled : ""
          }`}
          id="sizeSlider"
          type="range"
          min={sliderMinValue(currentSort)}
          max={sliderMaxValue(currentSort)}
          step={sliderStep(currentSort)}
          value={sliderValue(currentSort, animation.array)}
          onChange={(e) => changeArraySize(e, currentSort)}
        ></input>
        {animation.array.length}
      </div>
      <div className={styles["slider-container"]}>
        <label htmlFor="speedSlider">Sorting Speed</label>
        <input
          className={styles["slider"]}
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
        options={OPTIONS}
        value={animation.currentSort}
        onChange={(option) => changeSort(option)}
        disabled={animation.isRunning}
      ></Select>
    </div>
  );
}

export default Toolbar;
