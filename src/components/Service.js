import React from "react";

export class Service extends React.Component {
  rawMarkup() {
    var rawMarkup = this.props.swim.content;
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div className="contenttext">
        <h1 className="contentheadline">{this.props.swim.title}</h1>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
        {this.props.swim.contentSnippet}
      </div>
    );
  }
}
