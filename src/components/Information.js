import React from "react";

class Information extends React.Component {
  rawMarkup() {
    var rawMarkup = this.props.repos.content;
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div className="contenttext">
        <h1 className="contentheadline">{this.props.repos.title}</h1>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
        {this.props.repos.contentSnippet}
      </div>
    );
  }
}

export default Information