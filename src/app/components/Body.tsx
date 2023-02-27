import { useAppSelector } from "../hooks";
import { COLOR } from "../other/constants";
import "./Body.css";

function Body() {
  const animation = useAppSelector((state) => state.animation);

  function getBarColor(idx: number) {
    if (idx in animation.coloredIndices) {
      return animation.coloredIndices[idx];
    } else return COLOR.DEFAULT[idx % 3];
  }

  const resizeFactor = 100 / animation.array.length / 1.1;

  return (
    <div className="array-container">
      {animation.array?.map((value, idx) => (
        <div
          className="array-bar"
          style={{
            height: `${(value * resizeFactor)}%`,
            width: `${resizeFactor}em`,
            boxShadow: `${0.1 * resizeFactor}em ${0.1 * resizeFactor}em black`,
            margin: `0 ${0.1 * resizeFactor}em`,
            background: `linear-gradient(${getBarColor(idx)}, grey)`
          }}
          key={`${idx} ${value}`}
        ></div>
      ))}
    </div>
  );
}

export default Body;
