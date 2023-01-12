import React, { useReducer } from "react";
import Body from "./Body";
import Toolbar from "./Toolbar";
import "./SortingVisualizer.css";
import { initAnimation, animationReducer } from "../functions/animationReducer";

function SortingVisualizer() {
  const ANIMATION_DELAY = 30;
  const ARRAY_SIZE = 100;

  const [animation, dispatchAnimation] = useReducer(
    animationReducer,
    initAnimation(ARRAY_SIZE, ANIMATION_DELAY)
  );

  return (
    <div className="sorting-visualizer">
      <Toolbar
        animationState={animation}
        dispatchAnimation={dispatchAnimation}
      ></Toolbar>
      <Body animationState={animation}></Body>
    </div>
  );
}

export default SortingVisualizer;
