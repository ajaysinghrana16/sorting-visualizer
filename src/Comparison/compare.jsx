import React, { Component } from "react";
import "../App.css";
import { randomIntFromInterval, arraysAreEqual } from "../App";
import { getBubbleSortAnimation, bubbleSort } from "../sortingAlgo/bubbleSort";
import { getMergeSortAnimations } from "../sortingAlgo/mergeSort";
import { quickSortAnimation, quickSort } from "../sortingAlgo/quickSort";
import SortingVisualizer from "./sortingVisual";
import "./compare.css";
import {
  getInsertionSortAnimation,
  insertionSort,
} from "../sortingAlgo/insertionSort";
import Nav from "./nav";

/* Global variables (We need to separtely operate on the global variables and the state variables, 
  because we need Global variables to be constant throughout)
  
  NOTE: If you console.log() a lot, it can slow down the components*/

const PRIMARY_COLOR = "rgba(204, 51, 255, 0.6)";

const SECONDARY_COLOR = "rgba(255, 0, 102, 0.6)";

const FINAL_COLOR = "rgb(153, 204, 255, 0.8)";

var exec_time_runAll = 0;

const NUMBER_OF_ARRAY_BARS_INITIAL = 4;
const ANIMATION_SPEED_MS_INITIAL = 500;
const bar_width_initial = "40px";

const NUMBER_OF_ARRAY_BARS_FINAL = 25;
const ANIMATION_SPEED_MS_FINAL = 5;
const bar_width_final = "8px";

class Compare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      speed_value: 1,
      arrayBubble: [],
      arrayMerge: [],
      arrayQuick: [],
      arrayInsertion: [],
      NUMBER_OF_ARRAY_BARS: NUMBER_OF_ARRAY_BARS_INITIAL,
      ANIMATION_SPEED_MS: ANIMATION_SPEED_MS_INITIAL,
      bar_width: bar_width_initial,
      buttons_state: ["enabled", "enabled", "enabled", 0, 0],
      time: [0, 0, 0],
      number_comparison: [0, 0, 0],
    };
  }

  componentDidMount() {
    console.log("Component DidMount() called!");
    this.resetArray();
  }

  resetArray = () => {
    /* Disable other buttons */
    this.handleButtonDisable();

    const arrayBarsBubble = document.getElementsByClassName("bar-bubble");
    const arrayBarsInsertion = document.getElementsByClassName("bar-insertion");
    const arrayBarsQuick = document.getElementsByClassName("bar-quick");

    /* Turn the color of the bars to the default color when array is not sorted (helpful when you generate 
      new array after you have already done sorting before) */
    for (let Idx = 0; Idx < arrayBarsBubble.length; Idx++) {
      arrayBarsBubble[Idx].style.backgroundColor = PRIMARY_COLOR;
      arrayBarsInsertion[Idx].style.backgroundColor = PRIMARY_COLOR;
      arrayBarsQuick[Idx].style.backgroundColor = PRIMARY_COLOR;
    }

    /* Resets the array based on the Updated state variables */
    const array = [];
    for (let i = 0; i < this.state.NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 400));
    }

    /* Creating a deep copy of the array */
    let arrayBubble = [...array];
    let arrayMerge = [...array];
    let arrayQuick = [...array];
    let arrayInsertion = [...array];
    this.setState({
      arrayBubble: arrayBubble,
      arrayMerge: arrayMerge,
      arrayQuick: arrayQuick,
      arrayInsertion: arrayInsertion,
      time: [0, 0, 0],
      number_comparison: [0, 0, 0],
    });

    /* Re-enable other buttons */
    this.handleButtonEnable();
  };

  handleButtonDisable = () => {
    /* Disabling all the buttons */
    for (let Idx = 0; Idx < this.state.buttons_state.length - 2; Idx++) {
      this.state.buttons_state[Idx] = "disabled";
    }

    /* Disabling the range sliders */
    this.state.buttons_state[3] = 1;
    this.state.buttons_state[4] = 1;
    this.setState({ buttons_state: this.state.buttons_state });
  };

  handleButtonEnable = () => {
    /* Once the sorting is done, we can have our button back to be enabled */
    for (let Idx = 0; Idx < this.state.buttons_state.length - 2; Idx++) {
      this.state.buttons_state[Idx] = "enabled";
    }

    /* Enabling the range sliders */
    this.state.buttons_state[3] = 0;
    this.state.buttons_state[4] = 0;
    this.setState({ buttons_state: this.state.buttons_state });
  };

  handleArraySizeOnChange = (event) => {
    /* Handles the onChange method of "Vary the array size" slider */

    let value = event.target.value;
    let array_bars =
      NUMBER_OF_ARRAY_BARS_INITIAL +
      Math.ceil(
        ((parseInt(value) - 1) *
          (NUMBER_OF_ARRAY_BARS_FINAL - NUMBER_OF_ARRAY_BARS_INITIAL)) /
          99
      );
    let width =
      parseInt(bar_width_initial) -
      ((parseInt(value) - 1) *
        (parseInt(bar_width_initial) - parseInt(bar_width_final))) /
        99;

    /* Since the setState is asynchronous we have exclusively pass the updated state variables to the this.resetArray() function */
    this.setState(
      {
        value: value,
        NUMBER_OF_ARRAY_BARS: array_bars,
        bar_width: `${width}px`,
      },
      () => this.resetArray()
    );
  };

  handleSpeedChange = (event) => {
    /* It handles the speed on which you want the algorithm to run*/
    let speed_value = event.target.value;
    let speed =
      ANIMATION_SPEED_MS_INITIAL -
      ((parseInt(speed_value) - 1) *
        (ANIMATION_SPEED_MS_INITIAL - ANIMATION_SPEED_MS_FINAL)) /
        99;
    this.setState({
      speed_value: speed_value,
      ANIMATION_SPEED_MS: speed,
    });
  };

  handleExit = () => {
    this.resetArray();
  };

  runAll = () => {
    /* Disable all the buttons after starting operation on this button */
    this.handleButtonDisable();

    this.getBubbleAnimation();
    this.quickSortAnimations();
    this.insertionSortAnimations();

    /* Enable all the buttons back */
    /* Re-enable other buttons, but after the array is sorted and array-bars are turned into the FINAL_COLOR 
        -> USE SETTIMEOUT() for that*/
    setTimeout(() => {
      this.handleButtonEnable();
    }, exec_time_runAll);
  };

  mergeSort = () => {
    const animations = getMergeSortAnimations(this.state.arrayMerge);

    /* Reseting the color back to PRIMARY COLOR */
    const arrayBars = document.getElementsByClassName("bar-merge");
    for (let Idx = 0; Idx < arrayBars.length; Idx = Idx + 1) {
      arrayBars[Idx].style.backgroundColor = PRIMARY_COLOR;
    }

    for (let i = 0; i < animations.length; i++) {
      /* const arrayBars = document.getElementsByClassName("array-bar"); */
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.state.ANIMATION_SPEED_MS);
      }

      /* Change the color to FINAL after array bars are sorted */
      for (let Idx = 0; Idx < this.state.NUMBER_OF_ARRAY_BARS; Idx++) {
        setTimeout(() => {
          arrayBars[Idx].style.backgroundColor = FINAL_COLOR;
        }, animations.length * this.state.ANIMATION_SPEED_MS);
      }
    }
  };

  getBubbleAnimation = () => {
    /* Capturing the Time and number of comparison using Insertion sort */
    let arrayBubbleCopy = [...this.state.arrayBubble];
    var [exec_time, num_comparison] = bubbleSort(arrayBubbleCopy);

    this.state.time[0] = exec_time;
    this.state.number_comparison[0] = num_comparison;
    this.setState({
      time: this.state.time,
      number_comparison: this.state.number_comparison,
    });

    arrayBubbleCopy = [...this.state.arrayBubble];

    const animations = getBubbleSortAnimation(arrayBubbleCopy);

    /* Reseting the color back to the PRIMARY COLOR */
    const arrayBars = document.getElementsByClassName("bar-bubble");
    for (let Idx = 0; Idx < arrayBars.length; Idx = Idx + 1) {
      arrayBars[Idx].style.backgroundColor = PRIMARY_COLOR;
    }

    console.log("Entering the animation Model!");
    /* console.log("Array is -> ", this.state.arrayCopy); */

    for (let i = 0; i < animations.length - 1; i = i + 2) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const [barOneHeight, barTwoHeight] = animations[i + 1];

      setTimeout(() => {
        // Change the color from primary to secondary
        arrayBars[barOneIdx].style.backgroundColor = SECONDARY_COLOR;
        arrayBars[barTwoIdx].style.backgroundColor = SECONDARY_COLOR;

        // Change the heights of both bars (swap the heights)
        arrayBars[barOneIdx].style.height = `${barTwoHeight}px `;
        arrayBars[barTwoIdx].style.height = `${barOneHeight}px`;

        /* Swapping the values of the arrayCopy state variable just like the arrayBars height */
        /* We can not do it using array state variable because after returning from getBubbleAnimations(), array is Sorted 
        and we need the original unsorted one to render the array elements change */
        this.state.arrayBubble[barOneIdx] = barTwoHeight;
        this.state.arrayBubble[barTwoIdx] = barOneHeight;
        this.setState({ arrayBubble: this.state.arrayBubble });
      }, (i / 2) * this.state.ANIMATION_SPEED_MS);

      setTimeout(() => {
        // Change the color back to primary color
        arrayBars[barOneIdx].style.backgroundColor = PRIMARY_COLOR;
        arrayBars[barTwoIdx].style.backgroundColor = PRIMARY_COLOR;
      }, ((i + 1) / 2) * this.state.ANIMATION_SPEED_MS);
    }

    /* console.log("arrayCopy is -> ", this.state.arrayCopy); */

    /* Handling the case where array already sorted - So we have to first turn the color to PRIMARY COLOR and
    then after some time change it back to FINAL COLOR */

    for (let Idx = 0; Idx < this.state.NUMBER_OF_ARRAY_BARS; Idx++) {
      setTimeout(() => {
        arrayBars[Idx].style.backgroundColor = FINAL_COLOR;
      }, (animations.length / 2 + 2) * this.state.ANIMATION_SPEED_MS);
    }

    /* Incrementing the value of exec_time_runAll */
    exec_time_runAll +=
      (animations.length / 2 + 3) * this.state.ANIMATION_SPEED_MS;
  };

  quickSortAnimations = () => {
    let arrayQuickCopy = [...this.state.arrayQuick];

    var [exec_time, num_comparison] = quickSort(
      arrayQuickCopy,
      0,
      arrayQuickCopy.length - 1
    );

    /* Setting the execution time and Number of Comparison taken */
    this.state.time[2] = exec_time;
    this.state.number_comparison[2] = num_comparison;
    this.setState({
      time: this.state.time,
      number_comparison: this.state.number_comparison,
    });

    /* Disable other buttons */
    this.handleButtonDisable();

    const animations = [];
    arrayQuickCopy = [...this.state.arrayQuick];
    quickSortAnimation(
      animations,
      arrayQuickCopy,
      0,
      arrayQuickCopy.length - 1
    );

    /* Reseting the color back to the PRIMARY COLOR */
    const arrayBars = document.getElementsByClassName("bar-quick");
    for (let Idx = 0; Idx < arrayBars.length; Idx = Idx + 1) {
      arrayBars[Idx].style.backgroundColor = PRIMARY_COLOR;
    }

    // Now swapping the right indexes
    let j = 0;
    for (let i = 0; i < animations.length; i++) {
      if (animations[i][0][0] !== animations[i][0][1]) {
        const arrayBars = document.getElementsByClassName("bar-quick");
        const [barOneIdx, barTwoIdx] = animations[i][0];
        const [barOneHeight, barTwoHeight] = animations[i][1];

        setTimeout(() => {
          // Change the color from primary to secondary
          arrayBars[barOneIdx].style.backgroundColor = SECONDARY_COLOR;
          arrayBars[barTwoIdx].style.backgroundColor = SECONDARY_COLOR;

          // Change the heights of both bars (swap the heights)
          arrayBars[barOneIdx].style.height = `${barTwoHeight}px `;
          arrayBars[barTwoIdx].style.height = `${barOneHeight}px`;

          /* Swapping the values of the arrayCopy state variable just like the arrayBars height */
          /* We can not do it using array state variable because after returning from getBubbleAnimations(), array is Sorted 
        and we need the original unsorted one to render the array elements change */
          this.state.arrayQuick[barOneIdx] = barTwoHeight;
          this.state.arrayQuick[barTwoIdx] = barOneHeight;
          this.setState({ arrayQuick: this.state.arrayQuick });
        }, j * this.state.ANIMATION_SPEED_MS);

        setTimeout(() => {
          // Change the color back to primary color
          arrayBars[barOneIdx].style.backgroundColor = PRIMARY_COLOR;
          arrayBars[barTwoIdx].style.backgroundColor = PRIMARY_COLOR;
        }, (j + 0.5) * this.state.ANIMATION_SPEED_MS);
        j++;
      }
    }

    /* Handling the case where array already sorted - So we have to first turn the color to PRIMARY COLOR and
    then after some time change it back to FINAL COLOR */
    for (let Idx = 0; Idx < arrayBars.length; Idx++) {
      setTimeout(() => {
        arrayBars[Idx].style.backgroundColor = FINAL_COLOR;
      }, (j + 2) * this.state.ANIMATION_SPEED_MS);
    }

    /* Incrementing the value of exec_time_runAll */
    exec_time_runAll += (j + 3) * this.state.ANIMATION_SPEED_MS;
  };

  insertionSortAnimations = () => {
    var start_time = performance.now();

    /* Capturing the Time and number of comparison using Insertion sort */
    let arrayInsertionCopy = [...this.state.arrayInsertion];
    var [exec_time, num_comparison] = insertionSort(arrayInsertionCopy);

    this.state.time[1] = exec_time;
    this.state.number_comparison[1] = num_comparison;
    this.setState({
      time: this.state.time,
      number_comparison: this.state.number_comparison,
    });

    /* Testing the animations obtained from insertionSort */
    /* console.log("Array is => ", this.state.array); */
    arrayInsertionCopy = [...this.state.arrayInsertion];
    const animations = getInsertionSortAnimation(arrayInsertionCopy);

    /* Reseting the color back to Primary color */
    const arrayBars = document.getElementsByClassName("bar-insertion");
    for (let Idx = 0; Idx < arrayBars.length; Idx = Idx + 1) {
      arrayBars[Idx].style.backgroundColor = PRIMARY_COLOR;
    }

    for (let Idx = 0; Idx < animations.length; Idx++) {
      /* console.log("Animations Idx => ", animations[Idx]); */
      const [barIdx, barHeight] = animations[Idx];
      console.log(barIdx, barHeight);

      setTimeout(() => {
        arrayBars[barIdx].style.backgroundColor = SECONDARY_COLOR;
        arrayBars[barIdx].style.height = `${barHeight}px`;
        /* Change the values in arrayCopy state variable so as to show
        the value change in the animation  */
        this.state.arrayInsertion[barIdx] = barHeight;
        this.setState({ arrayInsertion: this.state.arrayInsertion });
      }, Idx * this.state.ANIMATION_SPEED_MS);

      setTimeout(() => {
        arrayBars[barIdx].style.backgroundColor = PRIMARY_COLOR;
      }, (Idx + 0.5) * this.state.ANIMATION_SPEED_MS);
    }

    /* After sorting change the bar colors to the FINAL color */
    for (let Idx = 0; Idx < arrayBars.length; Idx++) {
      setTimeout(() => {
        arrayBars[Idx].style.backgroundColor = FINAL_COLOR;
      }, animations.length * this.state.ANIMATION_SPEED_MS);
    }
    /* Incrementing the value of exec_time_runAll */
    exec_time_runAll += (animations.length + 1) * this.state.ANIMATION_SPEED_MS;
  };

  displayNumbersOnArrayOrNot = () => {
    /* Decides the color of the text on the array bars */
    if (this.state.arrayBubble.length < 10) {
      return "white";
    }
    return "transparent";
  };

  render() {
    return (
      <div className="App">
        <Nav
          runAll={this.runAll}
          buttons_state={this.state.buttons_state}
          resetArray={this.resetArray}
          mergeSort={this.mergeSort}
          quickSortAnimations={this.quickSortAnimations}
          getBubbleAnimation={this.getBubbleAnimation}
        />

        <div>
          <div className="Array_size_slider">
            Vary the array size
            <input
              disabled={parseInt(this.state.buttons_state[3])}
              type="range"
              min={1}
              max={100}
              value={this.state.value}
              onChange={(event) => this.handleArraySizeOnChange(event)}
            />
          </div>
          <div className="Speed_slider">
            Speed
            <input
              disabled={parseInt(this.state.buttons_state[4])}
              type="range"
              min={1}
              max={100}
              value={this.state.speed_value}
              onChange={(event) => this.handleSpeedChange(event)}
            />
          </div>
          <div className="Outer-container">
            <SortingVisualizer
              number_comparison={this.state.number_comparison}
              time={this.state.time}
              arrayBubble={this.state.arrayBubble}
              arrayInsertion={this.state.arrayInsertion}
              arrayQuick={this.state.arrayQuick}
              bar_width={this.state.bar_width}
              displayNumbersOnArrayOrNot={this.displayNumbersOnArrayOrNot}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Compare;
