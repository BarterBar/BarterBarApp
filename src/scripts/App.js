import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Register from "./components/Register";
import firebase from "../scripts/firebase";

const { Provider, Consumer } = React.createContext();

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      showError: false,
      showPostForm: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState(
          {
            loggedIn: true
          },
          () => {
            this.dbRef = firebase.database().ref(user.uid);
          }
        );
      }
    });
  }

  logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          loggedIn: false
        });

        this.dbRef.off();
      });
  };

  checkLoggedIn = () => {
    if (this.state.loggedIn === true) {
      this.setState({
        showPostForm: true,
      })
    } else {
      this.setState({
        showError: true
      })
    }
  };

  render() {
    let authButtons = "";
    if (this.state.loggedIn === false) {
      authButtons = <Register />;
    } else if (this.state.loggedIn === true) {
      authButtons = <button onClick={this.logOut}>Log Out</button>;
    }

    return (
      <div className="App">
        {authButtons}
        <button onClick={this.checkLoggedIn}>Post Service</button>

        {this.state.showError && (
          <div>
            <p>Only registered users can post items</p>
          </div>
        )}

        {this.state.showPostForm && (
          <form className="container container__form">
            <select name="serviceTypes" id="serviceTypes" required>
              <option value="automotive">Automotive</option>
              <option value="beauty">Beauty</option>
              <option value="education">Education</option>
              <option value="food">Food</option>
              <option value="health">Health</option>
              <option value="labour">Labour</option>
              <option value="transportation">Transportation</option>
              <option value="misc">Misc</option>
            </select>
            <input type="submit" />
          </form>
        )}

        <form action="" className="searchForm">
          <input
            className="searchParams"
            type="search"
            placeholder="tutor, hair cut, baby sitting"
            required
          />
          <select name="searchLocations" id="searchLocations" required>
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
