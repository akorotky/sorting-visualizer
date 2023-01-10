import "./Body.css";

function Body({ animationState }) {
  const { array, isArraySorted, activeIndex, pivotIndex } = animationState;

  const COLOR = {
    ACTIVE_INDEX: "orangered",
    PIVOT_INDEX: "gold",
    SORTED: "rgb(26, 190, 11)",
  };

  const widthRatio = 100 / array.length;
  const heightRatio = widthRatio / 1.4;

  function getColor(idx) {
    if (isArraySorted) return COLOR.SORTED;
    if (idx === activeIndex) return COLOR.ACTIVE_INDEX;
    if (idx === pivotIndex) return COLOR.PIVOT_INDEX;
    return null;
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
