import React from "react";
import ReactDOM from "react-dom/client";
import SortingVisualizer from "./app/components/SortingVisualizer";
import { Provider } from "react-redux";
import store from "./app/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <SortingVisualizer></SortingVisualizer>
    </Provider>
  </React.StrictMode>
);
