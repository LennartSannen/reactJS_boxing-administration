import React, { Component } from "react";

class TrainingType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }

  componentDidMount() {}

  render() {
    const stringType = this.state.value.toLowerCase();
    return (
      <option selected={this.props.type === this.state.value ? true : false}>
        {stringType}
      </option>
    );
  }
}

export default TrainingType;
