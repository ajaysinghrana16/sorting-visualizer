import React from "react";
import "./App.css";
import SortingVisualizer from "./sortingVisualization/sortingVisualizer";
import NavBar from "./navBar/navBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <SortingVisualizer />
    </div>
  );
}

export default App;
