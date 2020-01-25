import React, { Component } from "react";
import "./css/Quote.css";

export default class Quote extends Component {
  state = {
    liking: false,
    disliking: false
  };

  like = () => {
    this.setState({ liking: true, disliking: false });
  };

  dislike = () => {
    this.setState({ liking: false, disliking: true });
  };

  render() {
    const { quoteText, quoteAuthor, liked, disliked } = this.props.data;

    return (
      <div>
        {this.state.liking ? (
          <p className="like">{quoteText}</p>
        ) : this.state.disliking ? (
          <p className="dislike">{quoteText}</p>
        ) : (
          <p>{quoteText}</p>
        )}

        {`By: ${quoteAuthor} `}
        <br />
        <br />
        <div>
          <button onClick={this.like}>Like</button>
          <button onClick={this.dislike}>Dislike</button>
        </div>
      </div>
    );
  }
}
