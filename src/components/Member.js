import React, { Component } from "react";

class Member extends Component {
  constructor(props) {
    super(props);

    this.state = {
      member: this.props.value,
      present: this.props.present,
      training: false,
      visible: true,
    };
  }
  componentDidMount() {
    this.setState({ training: this.props.training });
  }
  onMouseDownOption = () => {
    console.log("hello");
  };
  handleOnClickPresent = () => {
    this.props.getPresentMember(this.state.member);
    this.setState({ visible: false });
  };
  handleOnClickAbsent = () => {
    this.props.getAbsentMember(this.state.member);
  };
  render() {
    const member = this.state.member;
    return this.props.className === "trainerOption" ? (
      <option selected={this.props.selected} onChange={this.props.getTrainer}>
        {member.firstName + " " + member.lastName}
      </option>
    ) : (
      <React.Fragment>
        <div
          className="row"
          style={{ display: this.state.visible ? null : "none" }}
        >
          {this.state.training && this.state.present ? (
            <button
              className="memberItem memberItem-present"
              onClick={this.handleOnClickPresent}
            >
              <span role="img">&#10060;</span>
            </button>
          ) : null}
          <li className={this.props.className} value={member} key={member.id}>
            {" " + member.firstName + " " + member.lastName}
          </li>
          {this.state.training && this.state.present ? null : (
            <button
              className="memberItem memberItem-absent"
              onClick={this.handleOnClickAbsent}
            >
              <span role="img">&#129070;</span>
            </button>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Member;
