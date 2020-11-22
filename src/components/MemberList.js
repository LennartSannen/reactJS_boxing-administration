import React, { Component } from "react";
import Member from "./Member";
import Search from "./Search";

class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.value,
      title: this.props.title,
      present: this.props.present,
      filtered: [],
    };
  }

  componentDidMount() {
    this.setState({
      filtered: this.props.items,
    });
  }
  searchList = (list) => {
    this.setState({ filtered: list });
  };
  getPresentMember = (member) => {
    this.props.getPresentMember(member);
  };
  getAbsentMember = (member) => {
    this.props.getAbsentMember(member);
  };
  changeMembers(list) {
    this.setState({ data: list });
  }
  render() {
    var items = this.state.filtered ? this.state.filtered : this.state.data;
    return (
      <div className="listDiv">
        <b className="memberTitle">{this.state.title}</b>
        {this.state.data ? (
          <Search items={this.state.data} searchList={this.searchList}></Search>
        ) : null}
        <br></br>
        <ul className="ulMembers">
          {items
            ? items.map((member) => (
                <Member
                  className="list-group-item"
                  value={member}
                  getPresentMember={this.getPresentMember}
                  getAbsentMember={this.getAbsentMember}
                  present={this.state.present}
                  key={member.id}
                  training={this.props.training}
                ></Member>
              ))
            : null}
        </ul>
      </div>
    );
  }
}

export default MemberList;
