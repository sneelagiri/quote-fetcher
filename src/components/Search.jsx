import React, { Component } from "react";

export default class Search extends Component {
  state = {
    searchQuery: ""
  };

  handleSubmit = event => {
    this.props.searchByFetch(this.state.searchQuery, this.state.locationQuery);
    // this.setState({ searchQuery: "", locationQuery: "" });
    event.preventDefault();
  };

  handleChange = event => {
    this.setState({
      searchQuery: event.target.value
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="filter">Filter results by keyword(s): </label>
          <input
            type="text"
            name="newFetch"
            placeholder="Keyword(s)"
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />
          <button type="submit">Search!</button>
        </form>
      </div>
    );
  }
}
