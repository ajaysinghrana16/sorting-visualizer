import React from "react";
import "./sortingVisualizer.css";

const PRIMARY_COLOR = "rgba(204, 51, 255, 0.6)";

const SECONDARY_COLOR = "rgba(255, 0, 102, 0.6)";

const FINAL_COLOR = "rgb(153, 204, 255, 0.8)";

var colorList = {
  Initial: PRIMARY_COLOR,
  Current: SECONDARY_COLOR,
  Final: FINAL_COLOR,
};

function legends() {
  var colorList = {
    Initial: PRIMARY_COLOR,
    Current: SECONDARY_COLOR,
    Final: FINAL_COLOR,
  };

  var container = document.getElementById("legend-container");
  console.log(container);

  for (var key in colorList) {
    var boxContainer = document.createElement("DIV");
    var box = document.createElement("DIV");
    var label = document.createElement("SPAN");

    label.innerHTML = "      " + key;
    box.className = "legend-box";
    box.style.background = colorList[key];

    boxContainer.appendChild(box);
    boxContainer.appendChild(label);

    container.appendChild(boxContainer);
  }
}

export default class sortingVisualizer extends React.Component {
  componentDidMount() {
    /* legends(); */
  }
  render() {
    const { array, bar_width, displayNumbersOnArrayOrNot } = this.props;

    return (
      <div>
        <div className="array-container" style={{ height: 600 }}>
          {array.map((value, idx) => (
            <div
              className="array-bar"
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
      </div>
    );
  }
}
