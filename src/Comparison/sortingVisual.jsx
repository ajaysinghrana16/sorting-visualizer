import React from "react";
import "./sortingVisual.css";

const PRIMARY_COLOR = "rgba(204, 51, 255, 0.6)";

const SECONDARY_COLOR = "rgba(255, 0, 102, 0.6)";

const FINAL_COLOR = "rgb(153, 204, 255, 0.8)";

export default class sortingVisual extends React.Component {
  render() {
    const {
      number_comparison,
      time,
      arrayBubble,
      arrayInsertion,
      arrayQuick,
      bar_width,
      displayNumbersOnArrayOrNot,
    } = this.props;

    return (
      <div className="array-contain" style={{ height: 600 }}>
        <div className="display-inline">
          {arrayBubble.map((value, idx) => (
            <div
              className="bar-bubble"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
                color: displayNumbersOnArrayOrNot(),
                width: bar_width,
                textAlign: "center",
              }}
            >
              {value}
            </div>
          ))}
          <div id="box">
            Bubble Sort
            <hr />
            <div>Time: {time[0]} ms</div>
            <div>Number of Comparison: {number_comparison[0]}</div>
          </div>
        </div>
        <div className="display-inline">
          {arrayInsertion.map((value, idx) => (
            <div
              className="bar-insertion"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
                color: displayNumbersOnArrayOrNot(),
                width: bar_width,
                textAlign: "center",
              }}
            >
              {value}
            </div>
          ))}
          <div id="box">
            Insertion Sort
            <hr />
            <div>Time: {time[1]} ms</div>
            <div>Number of Comparison: {number_comparison[1]}</div>
          </div>
        </div>
        <div className="display-inline">
          {arrayQuick.map((value, idx) => (
            <div
              className="bar-quick"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
                color: displayNumbersOnArrayOrNot(),
                width: bar_width,
                textAlign: "center",
              }}
            >
              {value}
            </div>
          ))}
          <div id="box">
            Quick Sort
            <hr />
            <div>Time: {time[2]} ms</div>
            <div>Number of Comparison: {number_comparison[2]}</div>
          </div>
        </div>
        <div className="legend-container">
          <div className="legend-Element">
            <div
              className="legend-box"
              style={{ backgroundColor: PRIMARY_COLOR }}
            />
            <div>Start</div>
          </div>
          <div className="legend-Element">
            <div
              className="legend-box"
              style={{ backgroundColor: SECONDARY_COLOR }}
            />
            <div>Currently Operating</div>
          </div>
          <div className="legend-Element">
            <div
              className="legend-box"
              style={{ backgroundColor: FINAL_COLOR }}
            />
            <div>Final</div>
          </div>
        </div>
      </div>
    );
  }
}
