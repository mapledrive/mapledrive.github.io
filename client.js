class MenuExample extends React.Component{
    constructor(){
        super();
        this.state = { focused: 0 };
    }
    clicked(index){
        this.setState({focused: index});
    }
    render() {
        return (
            <div>
                <ul>{ this.props.items.map((m, index) => {
                        var style = '';
                        if(this.state.focused == index){
                            style = 'focused';
                        }
                        return <li className={style} onClick={this.clicked.bind(this, index)}>{m}</li>
                     }) }   
                </ul>
                <p>Selected: {this.props.items[this.state.focused]}</p>
            </div>
        );
    }
}

ReactDOM.render(<MenuExample items={ ['Home', 'Blog', 'Services', 'About', 'Contact us'] } />, document.getElementById('root'));