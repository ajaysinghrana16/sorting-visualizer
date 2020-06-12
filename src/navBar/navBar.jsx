import React, { Component } from "react";
import SortingVisualizer from "../sortingVisualization/sortingVisualizer";
import NavBarCSS from "./navBar.css";
import Slider from "./slider";

const PRIMARY_COLOR = "turquoise";

class NavBar extends React.Component {
  render() {
    const {
      ANIMATION_SPEED_MS,
      NUMBER_OF_ARRAY_BARS,
      arr,
      resetArray,
      testSortingAlgo,
      getBubbleAnimation,
      mergeSort,
      quickSortAnimations,
    } = this.props;

    return (
      <div className="toolbar">
        <a href="#" onClick={() => this.props.resetArray()}>
          Generate New Array
        </a>

        {/* <Slider
          ANIMATION_SPEED_MS={this.ANIMATION_SPEED_MS}
          NUMBER_OF_ARRAY_BARS={this.NUMBER_OF_ARRAY_BARS}
        /> */}
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
