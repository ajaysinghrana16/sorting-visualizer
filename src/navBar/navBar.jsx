import React, { Component } from "react";
import SortingVisualizer from "../sortingVisualization/sortingVisualizer";
import NavBarCSS from "./navBar.css";

const PRIMARY_COLOR = "turquoise";

class NavBar extends React.Component {
  render() {
    const { getBubbleAnimation, mergeSort, quickSortAnimations } = this.props;

    return (
      <div className="toolbar">
        <a href="#" onClick={() => this.props.resetArray()}>
          Generate New Array
        </a>
        <a href="#" onClick={() => getBubbleAnimation()}>
          Bubble Sort
        </a>
        <a href="#" onClick={() => mergeSort()}>
          Merge Sort
        </a>
        <a href="#" onClick={() => quickSortAnimations()}>
          Quick Sort
        </a>
      </div>
    );
  }
}

export default NavBar;
