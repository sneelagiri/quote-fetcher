import React, { Component } from "react";
import Quote from "./Quote";

export default class QuoteSearcher extends Component {
  state = {
    quotes: [],
    fetching: false,
    likeCount: 0,
    dislikeCount: 0
  };

  componentDidMount = () => {
    this.setState({ fetching: true });
    return fetch("https://quote-garden.herokuapp.com/quotes/search/tree")
      .then(res => res.json())
      .then(quotes => {
        const parsedQuotes = quotes.results.map(quote => ({
          id: quote._id,
          quoteText: quote.quoteText,
          quoteAuthor: quote.quoteAuthor,
          liked: false,
          disliked: false
        }));
        this.setState({ quotes: parsedQuotes, fetching: false });
      })
      .catch(err => {
        this.setState({ error: true, fetching: false });
        console.error("error!", err);
      });
  };

  like = id => {
    const quotesLiked = this.state.quotes.map(quote => {
      if (id === quote.id) {
        return { ...quote, liked: true, disliked: false };
      } else {
        return quote;
      }
    });
    this.setState({ quotes: quotesLiked });
  };

  dislike = id => {
    const quotesDisliked = this.state.quotes.map(quote => {
      if (id === quote.id) {
        return { ...quote, liked: false, disliked: true };
      } else {
        return quote;
      }
    });
    this.setState({ quotes: quotesDisliked });
  };

  render() {
    const likesCount = this.state.quotes.reduce((total, current) => {
      if (current.liked === true) {
        total = total + 1;
        return total;
      } else {
        return total;
      }
    }, 0);

    const dislikesCount = this.state.quotes.reduce((total, current) => {
      if (current.disliked === true) {
        total = total + 1;
        return total;
      } else {
        return total;
      }
    }, 0);

    return (
      <div>
        <h1>Quotes</h1>
        <p>
          Likes: {likesCount} / Dislikes: {dislikesCount}
        </p>
        {this.state.fetching ? "Loading..." : null}
        {this.state.quotes.map(quote => (
          <Quote data={quote} like={this.like} dislike={this.dislike} />
        ))}
      </div>
    );
  }
}
