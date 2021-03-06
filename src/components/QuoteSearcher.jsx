import React, { Component } from "react";
import Quote from "./Quote";
import Search from "./Search";
import AddQuote from "./AddQuote";
import uuid from "uuid";

export default class QuoteSearcher extends Component {
  state = {
    quotes: [],
    fetching: false,
    likeCount: 0,
    dislikeCount: 0,
    currentUrl: "https://quote-garden.herokuapp.com/quotes/search/tree",
    numOfAuthors: 0
  };

  addQuote = (quote, author) => {
    console.log(this.state.quotes);
    const newQuoteObj = {
      id: uuid.v4(),
      quoteText: quote,
      quoteAuthor: author,
      liked: false,
      disliked: false
    };
    this.setState({ quotes: [...this.state.quotes, newQuoteObj] });
  };

  fetchFunction = url => {
    this.setState({ fetching: true });
    return fetch(url)
      .then(res => res.json())
      .then(quotes => {
        const parsedQuotes = quotes.results.map(quote => ({
          id: quote._id,
          quoteText: quote.quoteText,
          quoteAuthor: quote.quoteAuthor,
          liked: false,
          disliked: false
        }));

        const uniqueQuotes = parsedQuotes.filter(
          (set => f => !set.has(f.quoteText) && set.add(f.quoteText))(new Set())
        );
        this.setState({ quotes: uniqueQuotes, fetching: false });
      })

      .catch(err => {
        this.setState({ error: true, fetching: false });
        console.error("error!", err);
      });
  };

  componentDidMount = () => {
    this.fetchFunction(this.state.currentUrl);
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

  searchByFetch = async searchQuery => {
    const desc = searchQuery.toLowerCase().replace(/ /g, "+");
    const url = `https://quote-garden.herokuapp.com/quotes/search/${desc}`;
    this.setState({
      currentUrl: url
    });
    this.fetchFunction(url);
  };

  uniqueAuthors = () => {
    const uniqueAuthors = this.state.quotes.filter(
      (set => f => !set.has(f.quoteAuthor) && set.add(f.quoteAuthor))(new Set())
    );
    return uniqueAuthors.length;
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
        <Search searchByFetch={this.searchByFetch} />
        <h2>
          Liked: {likesCount} / Disliked: {dislikesCount}
        </h2>
        <h2>
          Number of Quotes: {this.state.quotes.length} / Number of Authors:{" "}
          {this.uniqueAuthors()}
        </h2>
        <h3>
          {this.state.fetching
            ? "Loading..."
            : this.state.quotes.length === 0
            ? "No quotes found! Please enter a new keyword."
            : null}
        </h3>
        {this.state.quotes.map(quote => (
          <Quote data={quote} like={this.like} dislike={this.dislike} />
        ))}
        <h2>Add Your Quote Here</h2>
        <AddQuote addQuote={this.addQuote} />
      </div>
    );
  }
}
