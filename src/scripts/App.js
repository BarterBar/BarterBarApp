import React, { Component } from "react";
import Register from "./components/Register"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import firebase from "../scripts/firebase";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Register />
        <form action="" className="searchForm">
          <input
            className="searchParams"
            type="search"
            placeholder="tutor, hair cut, baby sitting"
            required
          />
          <select name="searchLocations" id="searchLocations">
            <option value="calgary">Calgary</option>
            <option value="halifax">Halifax</option>
            <option value="moncton">Moncton</option>
            <option value="montreal">Montreal</option>
            <option value="toronto">Toronto</option>
            <option value="vancouver">Vancouver</option>
          </select>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default App;
