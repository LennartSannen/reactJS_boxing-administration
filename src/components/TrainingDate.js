import React, { Component } from "react";

class TrainingDate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: this.props.newTraining,
      value: this.props.value ? this.props.value : null,
    };
  }
  componentDidMount() {
    var date = this.props.newTraining
      ? this.newDate()
      : this.formatDate(this.props.value);
    this.dateChange(date);
  }
  dateChange = (date) => {
    this.props.dateChange(date);
    this.setState({ value: date });
  };
  setEdit = () => {
    this.setState((prevState) => ({
      edit: !prevState.edit,
    }));
  };
  newDate = () => {
    var today = new Date();
    var monthZero = "";
    var dayZero = "";
    if (today.getMonth() < 9) {
      monthZero = "0";
    }
    if (today.getDate() < 10) {
      dayZero = "0";
    }
    var date =
      today.getFullYear() +
      "-" +
      monthZero +
      (today.getMonth() + 1) +
      "-" +
      dayZero +
      today.getDate();
    return date;
  };
  formatDate = (date) => {
    date = date.split("-");
    let year = date[2];
    let month = date[1];
    if (month.length === 1) {
      month = "0" + month;
    }
    let day = date[0];
    if (day.length === 1) {
      day = "0" + day;
    }
    date = year + "-" + month + "-" + day;
    return date;
  };
  render() {
    return (
      <React.Fragment>
        <div>
          <input
            value={this.state.value}
            type="date"
            id="datepicker"
            onChange={(event) => this.dateChange(event.target.value)}
          ></input>
        </div>
        <br></br>
      </React.Fragment>
    );
  }
}

export default TrainingDate;
