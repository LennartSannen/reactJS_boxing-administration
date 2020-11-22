import React, { Component } from "react";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    return (
      <div className="login">
        <MuiThemeProvider>
          <div>
            <br />
            <br />
            <br />
            <br />
            <h1>Login</h1>
            <TextField
              hintText="Vul hier uw gebruikersnaam in"
              floatingLabelText="Gebruikersnaam"
              onChange={(event, newValue) =>
                this.setState({ username: newValue })
              }
            />
            <br />
            <TextField
              type="password"
              hintText="Vul hier uw wachtwoord in"
              floatingLabelText="Wachtwoord"
              onChange={(event, newValue) =>
                this.setState({ password: newValue })
              }
            />
            <br />
            <RaisedButton
              label="Login"
              primary={true}
              style={style}
              onClick={event => this.handleClick(event)}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
  handleClick(event) {
    var apiBaseUrl = "http://85.214.202.103:8081/";
    var payload = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post(apiBaseUrl + "login", payload)
      .then(response => {
        if (response.status === 200) {
          console.log("Login successfull");
          this.props.updateLoginState();
          this.props.setAuthentication(response.data.token);
          this.props.setUsername(payload.username);
        } else {
          console.log("Username password do not match");
          alert("Gebruikersnaam en wachtwoord komen niet overeen");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
const style = {
  margin: 15
};
export default Login;
