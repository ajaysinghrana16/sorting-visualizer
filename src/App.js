import React, { Component } from "react";
import "./App.css";
import { bubbleSort, getBubbleSortAnimation } from "./sortingAlgo/bubbleSort";
import { getMergeSortAnimations } from "./sortingAlgo/mergeSort";
import { quickSort } from "./sortingAlgo/quickSort";
import SortingVisualizer from "./sortingVisualization/sortingVisualizer";
import NavBar from "./navBar/navBar";

/* Global variables (We need to separtely operate on the global variables and the state variables, 
  because we need Global variables to constant throughout)*/

const PRIMARY_COLOR = "turquoise";

const SECONDARY_COLOR = "pink";

const NUMBER_OF_ARRAY_BARS_INITIAL = 4;
const ANIMATION_SPEED_MS_INITIAL = 300;
const bar_width_initial = "30px";

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
    NUMBER_OF_ARRAY_BARS: NUMBER_OF_ARRAY_BARS_INITIAL,
    ANIMATION_SPEED_MS: ANIMATION_SPEED_MS_INITIAL,
    bar_width: bar_width_initial,
  };

  componentDidMount() {
    console.log("Component DidMount() called");
    this.resetArray();
  }

  resetArray = () => {
    /* Resets the array based on the Updated state variables */
    const array = [];
    for (let i = 0; i < this.state.NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({ array: array });
  };

  handleArraySizeOnChange = (event) => {
    /* Handles the onChange method of "Vary the array size" slider */

    let value = event.target.value;
    console.log("Under handleArraySizeOnChange()");
    console.log("this.state.value", value);
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

  /* Do bind this to "this" using ()=>*/
  mergeSort = () => {
    console.log(this.state);
    const animations = getMergeSortAnimations(this.state.array);
    console.log(animations);
    console.log("After call -> ", this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      //console.log(arrayBars[0]);
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
    const animations = getBubbleSortAnimation(this.state.array);

    for (let i = 0; i < animations.length - 1; i = i + 2) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const [barOneIdx, barTwoIdx] = animations[i];
      const [barOneHeight, barTwoHeight] = animations[i + 1];

      setTimeout(() => {
        // Change the color from primary to secondary
        arrayBars[barOneIdx].style.backgroundColor = SECONDARY_COLOR;
        arrayBars[barTwoIdx].style.backgroundColor = SECONDARY_COLOR;

        // Change the heights of both bars (swap the heights)
        arrayBars[barOneIdx].style.height = `${barTwoHeight}px `;
        arrayBars[barTwoIdx].style.height = `${barOneHeight}px`;
      }, (i / 2) * this.state.ANIMATION_SPEED_MS);
      setTimeout(() => {
        // Change the color back to primary color
        arrayBars[barOneIdx].style.backgroundColor = PRIMARY_COLOR;
        arrayBars[barTwoIdx].style.backgroundColor = PRIMARY_COLOR;
      }, ((i + 1) / 2) * this.state.ANIMATION_SPEED_MS);
    }

    /* for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      setTimeout(() => {
        arrayBars[NUMBER_OF_ARRAY_BARS - i - 1].style.backgroundColor = "blue";
      }, (NUMBER_OF_ARRAY_BARS - i - 1) * ANIMATION_SPEED_MS);
    } */

    /* const arrayBars = document.getElementsByClassName("array-bar");
    console.log(arrayBars.length);
    for (let i = 0; i < arrayBars.length; i++) {
      setTimeout(() => {
        //Change the color of all the bars to an another color
        arrayBars[i].style.backgroundColor = "blue";
      }, ((i + 4) / 2) * ANIMATION_SPEED_MS);
    }
  } */
  };

  quickSortAnimations = () => {
    const animations = [];
    quickSort(animations, this.state.array, 0, this.state.array.length - 1);
    console.log(animations);

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
        }, j * this.state.ANIMATION_SPEED_MS);

        setTimeout(() => {
          // Change the color back to primary color
          arrayBars[barOneIdx].style.backgroundColor = PRIMARY_COLOR;
          arrayBars[barTwoIdx].style.backgroundColor = PRIMARY_COLOR;
        }, (j + 0.5) * this.state.ANIMATION_SPEED_MS);
        j++;
      }
    }
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
          ANIMATION_SPEED_MS={this.state.ANIMATION_SPEED_MS}
          NUMBER_OF_ARRAY_BARS={this.state.NUMBER_OF_ARRAY_BARS}
          array={this.state.array}
          resetArray={this.resetArray}
          testSortingAlgo={this.testSortingAlgo}
          getBubbleAnimation={this.getBubbleAnimation}
          mergeSort={this.mergeSort}
          quickSortAnimations={this.quickSortAnimations}
        />
        <div className="slider">
          <div className="sliderH1">Vary the array size</div>
          <input
            type="range"
            min={1}
            max={100}
            value={this.state.value}
            className="sliderComp"
            onChange={(event) => this.handleArraySizeOnChange(event)}
          />
        </div>

        {
          <div className="slider">
            <div className="sliderH1">Speed</div>
            <input
              type="range"
              min={1}
              max={100}
              value={this.state.speed_value}
              className="slideComp"
              onChange={(event) => this.handleSpeedChange(event)}
            />
          </div>
        }
        <SortingVisualizer
          array={this.state.array}
          resetArray={this.resetArray}
          testSortingAlgo={this.testSortingAlgo}
          getBubbleAnimation={this.getBubbleAnimation}
          mergeSort={this.mergeSort}
          quickSortAnimations={this.quickSortAnimations}
          bar_width={this.state.bar_width}
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
