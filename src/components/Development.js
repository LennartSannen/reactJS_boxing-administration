import React, { Component } from "react";
import axios from "axios";

class Development extends Component {
  constructor(props) {
    super(props);

    //binding functions can be replaced by an arrowfunction
    this.state = {};
  }

  componentDidMount() {
    const token = sessionStorage.getItem("autHeader");
    axios
      .get("http://85.214.202.103:8081/swagger-ui.html", {
        headers: {
          Authorization: token
        }
      })
      .then(response => {
        console.log(response);
        console.log(response.data);
        this.setState(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    console.log("state", this.state);
    return null;
  }
}
export default Development;
