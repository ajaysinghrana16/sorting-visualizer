import React, { Component } from "react";
import "./App.css";
import { bubbleSort, getBubbleSortAnimation } from "./sortingAlgo/bubbleSort";
import { getMergeSortAnimations } from "./sortingAlgo/mergeSort";
import { quickSort } from "./sortingAlgo/quickSort";
import SortingVisualizer from "./sortingVisualization/sortingVisualizer";
import NavBar from "./navBar/navBar";

/* Global variables (We need to separtely operate on the global variables and the state variables, 
  because we need Global variables to be constant throughout)
  
  NOTE: If you console.log() a lot, it can slow down the components*/

const PRIMARY_COLOR = "rgba(204, 51, 255, 0.6)";

const SECONDARY_COLOR = "rgba(255, 0, 102, 0.6)";

const FINAL_COLOR = "rgb(153, 204, 255, 0.8)";

const NUMBER_OF_ARRAY_BARS_INITIAL = 4;
const ANIMATION_SPEED_MS_INITIAL = 500;
const bar_width_initial = "50px";

const NUMBER_OF_ARRAY_BARS_FINAL = 100;
const ANIMATION_SPEED_MS_FINAL = 5;
const bar_width_final = "3px";

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    value: 1,
    speed_value: 1,
    array: [],
    arrayCopy: [],
    NUMBER_OF_ARRAY_BARS: NUMBER_OF_ARRAY_BARS_INITIAL,
    ANIMATION_SPEED_MS: ANIMATION_SPEED_MS_INITIAL,
    bar_width: bar_width_initial,
    buttons_state: ["enabled", "enabled", "enabled", "enabled", 0, 0],
  };

  componentDidMount() {
    console.log("Component DidMount() called");
    this.resetArray();
  }

  resetArray = () => {
    /* Disable other buttons */
    this.handleButtonDisable();

    const arrayBars = document.getElementsByClassName("array-bar");
    /* Turn the color of the bars to the default color when array is not sorted (helpful when you generate 
      new array after you have already done sorting before) */
    for (let Idx = 0; Idx < arrayBars.length; Idx++) {
      arrayBars[Idx].style.backgroundColor = PRIMARY_COLOR;
    }

    /* Resets the array based on the Updated state variables */
    const array = [];
    for (let i = 0; i < this.state.NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }

    /* Creating a deep copy of the array */
    let arrayCopy = [...array];
    this.setState({ array: array, arrayCopy: arrayCopy });

    /* Re-enable other buttons */
    this.handleButtonEnable();
  };

  handleButtonDisable = () => {
    /* Disabling all the buttons */
    for (let Idx = 0; Idx < this.state.buttons_state.length - 2; Idx++) {
      this.state.buttons_state[Idx] = "disabled";
    }

    /* Disabling the range sliders */
    this.state.buttons_state[4] = 1;
    this.state.buttons_state[5] = 1;
    this.setState({ buttons_state: this.state.buttons_state });
  };

  handleButtonEnable = () => {
    /* Once the sorting is done, we can have our button back to be enabled */
    for (let Idx = 0; Idx < this.state.buttons_state.length - 2; Idx++) {
      this.state.buttons_state[Idx] = "enabled";
    }

    /* Enabling the range sliders */
    this.state.buttons_state[4] = 0;
    this.state.buttons_state[5] = 0;
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

  /* Do bind this to "this" using ()=>*/
  mergeSort = () => {
    console.log(this.state);
    const animations = getMergeSortAnimations(this.state.array);
    console.log(animations);
    console.log("After call -> ", this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
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
    }
  };

  getBubbleAnimation = () => {
    /* Disable other buttons */
    this.handleButtonDisable();

    const animations = getBubbleSortAnimation(this.state.array);

    /* Reseting the color back to the PRIMARY COLOR */
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let Idx = 0; Idx < arrayBars.length; Idx = Idx + 1) {
      arrayBars[Idx].style.backgroundColor = PRIMARY_COLOR;
    }

    console.log("Entering the animation Model!");
    /* console.log("Array is -> ", this.state.arrayCopy); */

    for (let i = 0; i < animations.length - 1; i = i + 2) {
      const arrayBars = document.getElementsByClassName("array-bar");
      /* console.log("arrayBars ->", arrayBars); */
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
        this.state.arrayCopy[barOneIdx] = barTwoHeight;
        this.state.arrayCopy[barTwoIdx] = barOneHeight;
        this.setState({ arrayCopy: this.state.arrayCopy });
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

    /* Re-enable other buttons, but after the array is sorted and array-bars are turned into the FINAL_COLOR 
        -> USE SETTIMEOUT() for that*/

    setTimeout(() => {
      /* Enable all the buttons afterwards */
      this.handleButtonEnable();
    }, (animations.length / 2 + 3) * this.state.ANIMATION_SPEED_MS);
  };

  quickSortAnimations = () => {
    /* Disable other buttons */
    /* let buttons_state = this.state.buttons_state; */
    this.handleButtonDisable();

    const animations = [];
    quickSort(animations, this.state.array, 0, this.state.array.length - 1);
    /* console.log(animations); */

    /* Reseting the color back to the PRIMARY COLOR */
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let Idx = 0; Idx < arrayBars.length; Idx = Idx + 1) {
      arrayBars[Idx].style.backgroundColor = PRIMARY_COLOR;
    }

    // Now swapping the right indexes
    let j = 0;
    for (let i = 0; i < animations.length; i++) {
      if (animations[i][0][0] !== animations[i][0][1]) {
        const arrayBars = document.getElementsByClassName("array-bar");
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
          this.state.arrayCopy[barOneIdx] = barTwoHeight;
          this.state.arrayCopy[barTwoIdx] = barOneHeight;
          this.setState({ arrayCopy: this.state.arrayCopy });
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

    /* Re-enable other buttons, but after the array is sorted and array-bars are turned into the FINAL_COLOR 
        -> USE SETTIMEOUT() for that*/

    setTimeout(() => {
      /* Enable all the buttons / options again */
      this.handleButtonEnable();
    }, (j + 3) * this.state.ANIMATION_SPEED_MS);
  };

  testSortingAlgo = () => {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const inBuiltMethodResult = array.slice().sort((a, b) => a - b);
      const quickSortedResult = array.slice();
      quickSort(quickSortedResult, 0, array.length - 1);
      console.log(arraysAreEqual(inBuiltMethodResult, quickSortedResult));
    }
  };

  displayNumbersOnArrayOrNot = () => {
    /* Decides the color of the text on the array bars */
    if (this.state.array.length < 16) {
      return "white";
    }
    return "transparent";
  };

  testSortingAlgoWithOneExample = () => {
    const array = [];
    const length = 4;
    for (let i = 0; i < length; i++) {
      array.push(randomIntFromInterval(1, 1000));
    }
    console.log("Original array:-> ", array);
    const quickSortedResult = array.slice();
    quickSort(quickSortedResult, 0, array.length - 1);
    console.log("Quick Sort array -> ", quickSortedResult);
  };

  render() {
    return (
      <div className="App">
        <NavBar
          buttons_state={this.state.buttons_state}
          resetArray={this.resetArray}
          getBubbleAnimation={this.getBubbleAnimation}
          mergeSort={this.mergeSort}
          quickSortAnimations={this.quickSortAnimations}
        />
        <div>
          <div className="Array_size_slider">
            Vary the array size
            <input
              disabled={parseInt(this.state.buttons_state[4])}
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
              disabled={parseInt(this.state.buttons_state[5])}
              type="range"
              min={1}
              max={100}
              value={this.state.speed_value}
              onChange={(event) => this.handleSpeedChange(event)}
            />
          </div>
        </div>
        <SortingVisualizer
          arrayCopy={this.state.arrayCopy}
          bar_width={this.state.bar_width}
          displayNumbersOnArrayOrNot={this.displayNumbersOnArrayOrNot}
        />
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  /* Generates random integers within a sepcified range*/
  return Math.floor(Math.random() * (max - min) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  /* To check whether our sorting algorithms are working as expected */
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}

export default App;
