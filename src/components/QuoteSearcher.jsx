import React, { Component } from "react";
import Quote from "./Quote";

export default class QuoteSearcher extends Component {
  state = {
    quotes: []
  };

  quoteText = () => {};

  quoteAuthor = () => {};

  render() {
    return (
      <div>
        <h1>Quotes</h1>
        {this.state.quotes.map(quote => (
          <Quote
            data={quote}
            quoteText={this.quoteText}
            quoteAuthor={this.quoteAuthor}
          />
        ))}
      </div>
    );
  }
}
