import React from "react";

export class Home extends React.Component {
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




// import React from 'react'
// import Parser from "rss-parser";

// export default class Home extends React.Component {
	// constructor(props) {
		// super(props);
		// this.state = { data: [] };
	// }
	// async componentDidMount() {
		// let parser = new Parser();
		// const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
		// let feed = await parser.parseURL(CORS_PROXY + 'https://www.reddit.com/.rss');
		// console.log(feed);
		// var news = feed.items.slice(0, 10);
		// this.setState({ data: news });
	// }
	// render() {  
		// return (
			// <div className="contenttext">
				// <h1 className="contentheadline">{this.state.data[0] ? "Latest news: " : "Loading, please wait"}</h1>
				// {this.state.data.map(item => (<div className="contenttext"><p>{item.title}</p></div>) ) }
			// </div>
		// )
	// }
// }