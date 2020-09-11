import React, { Component } from "react";
import NavBarCSS from "./navBar.css";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  onLinkChange = (Idx) => {
    let status = this.props.buttons_state[Idx];
    return status;
  };
  render() {
    const {
      buttons_state,
      resetArray,
      getBubbleAnimation,
      mergeSort,
      quickSortAnimations,
      insertionSortAnimations,
    } = this.props;

    return (
      <div className="toolbar">
        <Link
          className={this.onLinkChange(0)}
          to={{
            pathname: "/compare",
          }}
        >
          Compare algorithm
        </Link>
        <a
          href="#"
          className={this.onLinkChange(1)}
          onClick={() => resetArray()}
        >
          Generate New Array
        </a>
        <a
          href="#"
          className={this.onLinkChange(2)}
          onClick={() => insertionSortAnimations()}
        >
          Insertion Sort
        </a>
        <a
          href="#"
          className={this.onLinkChange(3)}
          onClick={() => getBubbleAnimation()}
        >
          Bubble Sort
        </a>
        <a
          href="#"
          className={this.onLinkChange(4)}
          onClick={() => mergeSort()}
        >
          Merge Sort
        </a>
        <a
          href="#"
          className={this.onLinkChange(5)}
          onClick={() => quickSortAnimations()}
        >
          Quick Sort
        </a>
        <a href="#" onClick={() => window.location.reload(false)}>
          Exit
        </a>
      </div>
    );
  }
}

export default NavBar;
