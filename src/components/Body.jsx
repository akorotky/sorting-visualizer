import { BAR_HEIGHT_RATIO, BAR_WIDTH_RATIO, COLOR } from "../constants";
import "./Body.css";

function Body({ animationState }) {
  const { animationArray, isArraySorted, coloredIndices } = animationState;

  function getBarColor(idx) {
    if (isArraySorted) return COLOR.SORTED[idx % 3];
    else if (idx in coloredIndices) {
      return coloredIndices[idx];
    } else return COLOR.DEFAULT[idx % 3];
  }

  return (
    <div className="array-container">
      {animationArray?.map((value, idx) => (
        <div
          className="array-bar"
          style={{
            height: `${value * BAR_HEIGHT_RATIO(animationArray.length)}vh`,
            width: `${BAR_WIDTH_RATIO(animationArray.length)}vw`,
            backgroundColor: getBarColor(idx),
          }}
          key={`${value} ${idx}`}
        ></div>
      ))}
    </div>
  );
}

export default Body;
