import React, { Component } from "react";

export default class AddQuote extends Component {
  state = {
    newQuote: "",
    quoteAuthor: ""
  };

  handleSubmit = event => {
    this.props.addQuote(this.state.newQuote, this.state.quoteAuthor);
    // this.setState({ searchQuery: "", locationQuery: "" });
    event.preventDefault();
  };

  handleChangeQuote = event => {
    this.setState({
      newQuote: event.target.value
    });
    // console.log(this.state.searchQuery);
  };

  handleChangeAuthor = event => {
    this.setState({
      quoteAuthor: event.target.value
    });
    // console.log(this.state.searchQuery);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="quoteAuthor">Name of Author: </label>
          <input
            type="text"
            name="newQuoteAuthor"
            placeholder="Enter author name"
            value={this.state.quoteAuthor}
            onChange={this.handleChangeAuthor}
          />
          <br></br>
          <br />
          <label htmlFor="quoteText">Add Quote: </label>
          <textarea
            type="textarea"
            name="newQuote"
            placeholder="Enter quote here"
            value={this.state.newQuote}
            onChange={this.handleChangeQuote}
          />
          <br />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}
