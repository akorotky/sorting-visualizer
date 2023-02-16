import Body from "./Body";
import Toolbar from "./Toolbar";
import "./SortingVisualizer.css";

function SortingVisualizer() {
  return (
    <div className="sorting-visualizer">
      <Toolbar></Toolbar>
      <Body></Body>
    </div>
  );
}

export default SortingVisualizer;
