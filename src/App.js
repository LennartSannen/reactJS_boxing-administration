import "./App.css";
import React, { Component } from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Trainingen from "./Trainingen";
import Login from "./Login";
import Development from "./components/Development";

class App extends Component {
  state = {
    login: null,
    autHeader: null,
    username: null,
    logo: true,
  };
  componentDidMount() {}
  updateLoginState = () => {
    this.setState((prevState) => ({
      login: !prevState.login,
    }));
  };
  setAuthentication = (header) => {
    this.setState({ autHeader: header });
    sessionStorage.setItem("autHeader", header);
  };
  setUsername = (username) => {
    this.setState({ username: username });
    sessionStorage.setItem("username", username);
  };
  updateLogoState = () => {
    this.setState({ logo: false });
  };
  render() {
    return (
      <Router>
        <Switch>
          <div className="App">
            <NavBar></NavBar>
            {!this.state.login && !sessionStorage.getItem("autHeader") ? (
              <Login
                updateLoginState={this.updateLoginState}
                setAuthentication={this.setAuthentication}
                setUsername={this.setUsername}
              ></Login>
            ) : (
              <React.Fragment>
                <Route
                  path="/trainingen"
                  render={(props) => (
                    <Trainingen
                      {...props}
                      isAuthed={true}
                      updateLogoState={this.updateLogoState}
                    />
                  )}
                />
                {this.state.logo ? (
                  <div className="mainLogoDiv">
                    <img
                      src={require("./images/4defenceNewLogoRound.jpg")}
                      className="mainLogo"
                    />
                  </div>
                ) : null}
              </React.Fragment>
            )}
            {sessionStorage.getItem("username") === "admin" ? (
              <Route path="/development" component={Development}></Route>
            ) : null}
          </div>
        </Switch>
      </Router>
    );
  }
}
export default App;
