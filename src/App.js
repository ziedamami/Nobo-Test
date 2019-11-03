import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header/Header.js";
import Home from "./Components/Home/Home";
import { Switch, Route } from "react-router-dom";
import Details from "./Components/Details/Details";
import Footer from "./Components/Footer/Footer";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div >
          <div >
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/details/:id" component={Details} />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
