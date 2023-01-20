import { useSelector } from "react-redux";
import { COLOR } from "../other/constants";
import "./Body.css";

function Body(props) {
  const animation = useSelector((state) => state.animation);

  function getBarColor(idx) {
    if (idx in animation.coloredIndices) {
      return animation.coloredIndices[idx];
    } else return COLOR.DEFAULT[idx % 3];
  }

  const resizeFactor = 100 / animation.array.length;

  return (
    <div className="array-container">
      {animation.array?.map((value, idx) => (
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
