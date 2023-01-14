import React, { useReducer } from "react";
import Body from "./Body";
import Toolbar from "./Toolbar";
import "./SortingVisualizer.css";
import { initAnimationState, animationReducer } from "../functions/animationReducer";

function SortingVisualizer() {
  const [animation, dispatchAnimation] = useReducer(
    animationReducer,
    initAnimationState()
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
