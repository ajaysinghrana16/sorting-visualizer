import React, { Component } from "react";
import NavBarCSS from "./nav.css";
import { Link } from "react-router-dom";

class Nav extends React.Component {
  onLinkChange = (Idx) => {
    let status = this.props.buttons_state[Idx];
    return status;
  };

  render() {
    const { runAll, resetArray } = this.props;

    return (
      <div className="toolbar">
        <Link
          className={this.onLinkChange(0)}
          to={{
            pathname: "/",
          }}
        >
          Back
        </Link>
        <a
          href="#"
          className={this.onLinkChange(1)}
          onClick={() => resetArray()}
        >
          Generate New Array
        </a>
        <a href="#" className={this.onLinkChange(2)} onClick={() => runAll()}>
          Run All!
        </a>
        <a href="#" onClick={() => window.location.reload(false)}>
          Exit
        </a>
      </div>
    );
  }
}

export default Nav;
