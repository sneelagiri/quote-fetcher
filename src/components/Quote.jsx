import React, { Component } from "react";

export default class Quote extends Component {
  render() {
    const { quoteText, quoteAuthor } = this.props.data;

    return (
      <div>
        {quoteText}
        <br></br>
        <br />
        {`By: ${quoteAuthor} `}
        <br />
        <br />
        <div>
          <button>Like</button>
          <button>Dislike</button>
        </div>
        <br />
        <br />
      </div>
    );
  }
}
