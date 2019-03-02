import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import SecondSection from "./components/SecondSection";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/second" component={SecondSection} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
