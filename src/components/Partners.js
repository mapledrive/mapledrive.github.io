import React from "react";

export default class Partners extends React.Component {
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


// https://www.valentinog.com/blog/how-async-await-in-react/
// export default class Partners extends React.Component {
	// constructor(props) {
		// super(props);
		// this.state = { data: [] };
	// }
	// async componentDidMount() {
		// const response = await fetch(`https://randomuser.me/api/?results=4`);
		// const json = await response.json();
		// var authors = json.results;
		// this.setState({ data: authors });
	// }
	// render() {
		// var authors = this.state.data;
		// return (
			// <div className="contenttext">
				// <h1 className="contentheadline">Partner names: </h1>
				// <div className="contain">
					// {authors.map((author, index) => (<div className="itemcontent" key={index}><span className="author">{author.name.first}</span><br/><img src={author.picture.large} alt="new" /></div> ))}
				// </div>  
			// </div>
		// )
	// }
// }