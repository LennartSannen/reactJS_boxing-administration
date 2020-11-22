import React, { Component } from "react";
import TrainingType from "./TrainingType";
class TrainingTypes extends Component {
  constructor(props) {
    super(props);
    this.type = React.createRef();
    this.state = {
      listType: this.props.listType,
      values: this.props.values,
      value: this.props.values[0],
    };
    this.type = React.createRef();
  }
  componentDidMount() {
    const token = sessionStorage.getItem("autHeader");
  }
  render() {
    return this.state.listType === "optionList" ? (
      <div className="form-group">
        <label for="trainerlbl">
          <b>Type training:</b>
        </label>
        <select
          ref="type"
          className="form-control"
          onChange={(event) => this.props.getType(event.target.value)}
        >
          {this.state.values.map((type) => (
            <TrainingType
              itemType="option"
              value={type}
              type={this.props.type}
            ></TrainingType>
          ))}
        </select>
      </div>
    ) : null;
  }
}

export default TrainingTypes;
