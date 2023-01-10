import React, { useReducer } from "react";
import Body from "./Body";
import Toolbar from "./Toolbar";
import "./SortingVisualizer.css";
import { initAnimation, animationReducer } from "../functions/animationReducer";

function SortingVisualizer() {
  const ANIMATION_SPEED = 0;
  const ARRAY_SIZE = 50;

  const [animation, dispatchAnimation] = useReducer(
    animationReducer,
    initAnimation(ARRAY_SIZE)
  );

  function toggleTheme() {
    return null;
  }

  return (
    <div className="sorting-visualizer">
      <Toolbar
        animationState={animation}
        dispatchAnimation={dispatchAnimation}
      ></Toolbar>
      <Body animationState={animation}></Body>
      {/* <button style={{position:"fixed", bottom:5, width:"100vw"}}onClick={toggleTheme}>Toggle Theme</button> */}
    </div>
  );
}

export default SortingVisualizer;
