import React from "react";
import { bubbleSort, getBubbleSortAnimation } from "../sortingAlgo/bubbleSort";
import { getMergeSortAnimations } from "../sortingAlgo/mergeSort";
import { quickSort } from "../sortingAlgo/quickSort";
import "./sortingVisualizer.css";

const PRIMARY_COLOR = "turquoise";

export default class sortingVisualizer extends React.Component {
  render() {
    const {
      array,
      resetArray,
      testSortingAlgo,
      getBubbleAnimation,
      mergeSort,
      quickSortAnimations,
    } = this.props;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
              textAlign: "justify",
            }}
          ></div>
        ))}
      </div>
    );
  }
}
