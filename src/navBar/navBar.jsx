import React, { Component } from "react";
import SortingVisualizer from "../sortingVisualization/sortingVisualizer";

class NavBar extends Component {
  render() {
    console.log("NavBar rendered");
    return (
      <React.Fragment id="toolbar">
        <div onClick>Generate New Array</div>
        <div>Bubble Sort</div>
        <div>Merge Sort</div>
        <div>Quick Sort</div>
      </React.Fragment>
    );
  }
}

export default NavBar;
