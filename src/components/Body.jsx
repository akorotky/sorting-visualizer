import { COLOR } from "../constants";
import "./Body.css";

function Body({ animationState }) {
  const { animationArray, isArraySorted, coloredIndices } = animationState;

  function getBarColor(idx) {
    if (isArraySorted) return COLOR.SORTED[idx % 3];
    else if (idx in coloredIndices) {
      return coloredIndices[idx];
    } else return COLOR.DEFAULT[idx % 3];
  }

  const resizeFactor = 100 / animationArray.length;

  return (
    <div className="array-container">
      {animationArray?.map((value, idx) => (
        <div
          className="array-bar"
          style={{
            height: `${(value * resizeFactor) / 1.4}vh`,
            width: `${resizeFactor}vw`,
            boxShadow: `${0.1 * resizeFactor}vw ${0.2 * resizeFactor}vh black`,
            margin: `0 ${0.1 * resizeFactor}vw`,
            backgroundColor: getBarColor(idx),
          }}
          key={`${idx} ${value}`}
        ></div>
      ))}
    </div>
  );
}

export default Body;
