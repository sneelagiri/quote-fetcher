import React, { Component } from "react";
import Quote from "./Quote";

export default class QuoteSearcher extends Component {
  state = {
    quotes: [],
    fetching: false
  };

  componentDidMount = () => {
    this.setState({ fetching: true });
    return fetch("https://quote-garden.herokuapp.com/quotes/search/tree")
      .then(res => res.json())
      .then(quotes => {
        const parsedQuotes = quotes.results.map(quote => ({
          id: quote._id,
          quoteText: quote.quoteText,
          quoteAuthor: quote.quoteAuthor
        }));
        this.setState({ quotes: parsedQuotes, fetching: false });
      })
      .catch(err => {
        this.setState({ error: true, fetching: false });
        console.error("error!", err);
      });
  };

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
