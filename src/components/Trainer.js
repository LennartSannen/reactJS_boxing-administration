import React, { Component } from "react";

class Trainer extends Component {
  render() {
    return (
      <option value={member} key={member.id} selected={this.state.selected}>
        {member.firstName + " " + member.lastName}
      </option>
    );
  }
}

export default Trainer;
