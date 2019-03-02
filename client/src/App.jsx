import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";

import Home from "./components/home/Home";
import SecondSection from "./components/SectionOne/SectionOne";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/section_one" component={SecondSection} />
        </Switch>
      </Router>
    );
  }
}

export default App;
