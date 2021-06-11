import React, { Component } from "react";
import "./SearchPanel.css";

export default class SearchPanel extends Component {
  state = {
    searchItem: ""
  };

  onSearch = event => {
    const searchItem = event.target.value;
    this.setState({ searchItem });
    this.props.onSearch(searchItem);
  };

  render() {
    return (
      <input
        placeholder="Type here to search"
        className="form-control search-input"
        value={this.state.searchItem}
        onChange={this.onSearch}
      />
    );
  }
}
