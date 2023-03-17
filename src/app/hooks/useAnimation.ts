import { ChangeEvent, useEffect, useState } from "react";
import {
  clearIndexColor,
  setArray,
  setDelay,
  setIndexColor,
  setIsPaused,
  setIsRunning,
} from "../features/animation-slice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { COLOR } from "../other/constants";
import {
  AnimationGenerator,
  AnimationGeneratorFunction,
  SelectOption,
  TAlgorithmsMap,
  TAnimation,
} from "../types";
import {
  generateArray,
  getShuffleDelay,
  getSortedDelay,
  sleep,
} from "../utils/common";
import useTimer from "./useTimer";

function useAnimation() {
  const animation = useAppSelector((state) => state.animation);
  const dispatch = useAppDispatch();
  const tick = useTimer();
  const [canRun, setCanRun] = useState<boolean>(true);
  const [animationGenerator, setAnimationGenerator] = useState<
    AnimationGenerator | undefined
  >(undefined);
  const {
    array: animationArray,
    isPaused: isPaused,
    isRunning: isRunning,
  } = animation;

  useEffect(() => {
    const canAnimate = isRunning && !isPaused;
    if (canAnimate) animateSort(animationArray, animationGenerator);
  }, [tick, isRunning, isPaused, animationGenerator]);

  function sort(array: number[], sortingFunction: AnimationGeneratorFunction) {
    setAnimationGenerator(sortingFunction([...array]));
    dispatch(setIsRunning(true));
  }

  function animateSort(
    array: number[],
    animationGenerator: AnimationGenerator | undefined
  ) {
    const currentAnimation = animationGenerator?.next();
    if (currentAnimation === undefined || currentAnimation.done) {
      endAnimation(array);
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

  function changeArraySize(
    e: ChangeEvent<HTMLInputElement>,
    currentSort: SelectOption
  ) {
    // target value is a string
    const sliderValue = parseInt(e.target.value);
    const newArraySize =
      currentSort.value === "bitonicSort"
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

  function pauseSorting() {
    dispatch(setIsPaused(!animation.isPaused));
  }

  function endAnimation(arr: number[]) {
    setAnimationGenerator(undefined);
    resetColors(arr);
    dispatch(setIsRunning(false));
    dispatch(setIsPaused(false));
  }

  function resetColors(arr: number[]) {
    const indicesToClear = arr.map((val, idx) => idx);
    dispatch(clearIndexColor(indicesToClear));
  }

  function handleAnimationRun(
    isRunning: boolean,
    arr: number[],
    currentSort: SelectOption,
    algorithms: TAlgorithmsMap
  ) {
    if (isRunning) {
      endAnimation(arr);
    } else sort(arr, algorithms[currentSort.value]);
  }

  return {
    state: animation,
    pause: pauseSorting,
    shuffle: shuffleAnimation,
    handle: handleAnimationRun,
    canRun: canRun,
    changeSize: changeArraySize,
    changeSpeed: changeSortingSpeed,
  };
}

export default useAnimation;
