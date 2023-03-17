import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";

function useTimer() {
  const { delay } = useAppSelector((state) => state.animation);
  const [isTicking, setIsTicking] = useState(false);

  useEffect(() => {
    const tickID = setInterval(() => {
      setIsTicking((prev) => !prev);
    }, delay);
    return () => clearInterval(tickID);
  }, [delay]);

  return isTicking;
}

export default useTimer;
