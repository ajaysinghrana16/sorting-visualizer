import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import App from "./App";
import Compare from "./Comparison/compare";

class ParentComp extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/compare" exact component={Compare} />
        </Switch>
      </Router>
    );
  }
}

export default ParentComp;
