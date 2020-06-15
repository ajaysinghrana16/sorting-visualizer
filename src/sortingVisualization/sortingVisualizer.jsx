import React from "react";
import { bubbleSort, getBubbleSortAnimation } from "../sortingAlgo/bubbleSort";
import { getMergeSortAnimations } from "../sortingAlgo/mergeSort";
import { quickSort } from "../sortingAlgo/quickSort";
import "./sortingVisualizer.css";

const PRIMARY_COLOR = "rgba(204, 51, 255, 0.6)";

export default class sortingVisualizer extends React.Component {
  render() {
    const { array, bar_width, displayNumbersOnArrayOrNot } = this.props;

    return (
      <div className="array-container" style={{ height: 730 }}>
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
              textAlign: "justify",
              color: displayNumbersOnArrayOrNot(),
              width: bar_width,
              textAlign: "center",
            }}
          >
            {value}
          </div>
        ))}
      </div>
    );
  }
}
