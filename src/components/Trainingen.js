import React, { Component } from "react";
import Training from "./components/Training.js";
import axios from "axios";

class Trainingen extends Component {
  constructor(props) {
    super(props);

    //binding functions can be replaced by an arrowfunction
    this.state = {
      trainings: [],
    };
  }

  componentDidMount() {
    this.props.updateLogoState();
    const token = sessionStorage.getItem("autHeader");
    this.getRequest(token, "trainings", "trainings");
    this.getRequest(token, "trainings/types", "trainingTypes");
    this.setState({ trainings: this.refactorDate(this.state.trainings) });
  }
  refactorDate = (array) => {
    array = array.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    array.forEach((element) => {
      var date = new Date(element.date);
      element.date =
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    });
    return array;
  };
  getRequest = (token, page, stateKey) => {
    const url = "http://85.214.202.103:8081/".concat(page);
    axios
      .get(url, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        this.setState({ [stateKey]: this.refactorDate(response.data) });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    let { trainings } = this.state;
    return (
      <div className="trainingen">
        <Training members="none"></Training>
        {trainings.map((training) => (
          <Training
            reload={this.reload}
            value={training}
            members={training.members}
            key={training.id}
          ></Training>
        ))}
      </div>
    );
  }
}
export default Trainingen;
