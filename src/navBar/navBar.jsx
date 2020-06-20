import React, { Component } from "react";
import NavBarCSS from "./navBar.css";

const PRIMARY_COLOR = "turquoise";

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
    } = this.props;

    return (
      <div className="toolbar">
        <a
          href="#"
          className={this.onLinkChange(0)}
          onClick={() => resetArray()}
        >
          Generate New Array
        </a>
        <a
          href="#"
          className={this.onLinkChange(1)}
          onClick={() => getBubbleAnimation()}
        >
          Bubble Sort
        </a>
        <a
          href="#"
          className={this.onLinkChange(2)}
          onClick={() => mergeSort()}
        >
          Merge Sort
        </a>
        <a
          href="#"
          className={this.onLinkChange(3)}
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
