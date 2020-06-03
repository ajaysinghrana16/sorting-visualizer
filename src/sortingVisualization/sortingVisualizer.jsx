import React from "react";
import { bubbleSort, getBubbleSortAnimation } from "../sortingAlgo/bubbleSort";
import { getMergeSortAnimations } from "../sortingAlgo/mergeSort";
import { quickSort } from "../sortingAlgo/quickSort";
import "./sortingVisualizer.css";

const NUMBER_OF_ARRAY_BARS = 40;

const ANIMATION_SPEED_MS = 50;

const PRIMARY_COLOR = "turquoise";

const SECONDARY_COLOR = "pink";

export default class sortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    console.log(array);
    this.setState({ array });
  }

  mergeSort() {
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
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  getBubbleAnimation() {
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
      }, (i / 2) * ANIMATION_SPEED_MS);
      setTimeout(() => {
        // Change the color back to primary color
        arrayBars[barOneIdx].style.backgroundColor = PRIMARY_COLOR;
        arrayBars[barTwoIdx].style.backgroundColor = PRIMARY_COLOR;
      }, ((i + 1) / 2) * ANIMATION_SPEED_MS);
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
  }

  quickSortAnimations() {
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
        }, j * ANIMATION_SPEED_MS);

        setTimeout(() => {
          // Change the color back to primary color
          arrayBars[barOneIdx].style.backgroundColor = PRIMARY_COLOR;
          arrayBars[barTwoIdx].style.backgroundColor = PRIMARY_COLOR;
        }, (j + 0.5) * ANIMATION_SPEED_MS);
        j++;
      }
    }
  }

  testSortingAlgo() {
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
  }

  testSortingAlgoWithOneExample() {
    const array = [];
    const length = 4;
    for (let i = 0; i < length; i++) {
      array.push(randomIntFromInterval(1, 1000));
    }
    console.log("Original array:-> ", array);
    const quickSortedResult = array.slice();
    quickSort(quickSortedResult, 0, array.length - 1);
    console.log("Quick Sort array -> ", quickSortedResult);
  }

  render() {
    const { array } = this.state;

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
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.testSortingAlgo()}>
          Test Sorting Algorithms (BROKEN)
        </button>
        <button onClick={() => this.getBubbleAnimation()}>bubble Sort</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSortAnimations()}>Quick Sort</button>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
