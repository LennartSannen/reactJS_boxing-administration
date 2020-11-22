import React, { Component } from "react";
import searchLogo from "../images/searchGlass.png";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      filtered: [],
      searchInput: ""
    };
  }
  componentDidMount() {
    this.setState({ searchInput: "" });
  }
  handleInput(event) {
    //clear white spaces
    const searchInput = event.target.value.replace(/\s/g, "");
    let newList = this.state.items.filter(function(e) {
      return (e.firstName + e.lastName)
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
    this.props.searchList(newList);
  }

  render() {
    return (
      <div classname="row">
        <input
          className="searchBar"
          type="text"
          onInput={event => this.handleInput(event)}
          placeholder="Zoek leden.."
        ></input>
        <button className="searchButton">
          <img className="searchLogo " src={searchLogo}></img>
        </button>
      </div>
    );
  }
}

export default Search;
