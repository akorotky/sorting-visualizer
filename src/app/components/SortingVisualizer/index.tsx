import Body from "../Body";
import Toolbar from "../Toolbar";
import styles from "./sorting-visualizer.module.css";

function SortingVisualizer() {
  return (
    <div className={styles["sorting-visualizer"]}>
      <Toolbar></Toolbar>
      <Body></Body>
    </div>
  );
}

export default SortingVisualizer;
