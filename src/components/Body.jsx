import "./Body.css";

function Body({ animationState }) {
  const { array, isArraySorted, coloredIndices } = animationState;

  const COLOR = {
    SORTED: ["forestgreen", "green", "darkgreen"],
    DEFAULT: ["silver", "darkgray", "gray"],
  };

  const widthRatio = 100 / array.length;
  const heightRatio = widthRatio / 1.4;

  function getColor(idx) {
    if (isArraySorted) return COLOR.SORTED[idx % 3];
    if (idx in coloredIndices) {
      return coloredIndices[idx];
    }

    return COLOR.DEFAULT[idx % 3];
  }

  return (
    <div className="array-container">
      {array?.map((value, idx) => (
        <div
          className="array-bar"
          style={{
            height: `${value * heightRatio}vh`,
            width: `${widthRatio}vw`,
            backgroundColor: getColor(idx),
          }}
          key={idx}
        ></div>
      ))}
    </div>
  );
}

export default Body;
