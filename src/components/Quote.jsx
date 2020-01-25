import React, { Component } from "react";
import "./css/Quote.css";

export default class Quote extends Component {
  render() {
    const { id, quoteText, quoteAuthor, liked, disliked } = this.props.data;

    return (
      <div>
        {liked ? (
          <p className="like">{quoteText}</p>
        ) : disliked ? (
          <p className="dislike">{quoteText}</p>
        ) : (
          <p>{quoteText}</p>
        )}

        {`By: ${quoteAuthor} `}
        <br />
        <br />
        <div>
          <button
            onClick={() => {
              this.props.like(id);
            }}
          >
            Like
          </button>
          <button
            onClick={() => {
              this.props.dislike(id);
            }}
          >
            Dislike
          </button>
        </div>
      </div>
    );
  }
}
