import React, {Component} from 'react';
import axios from 'axios';
import Output from './Output';
import Text from './Controls/Text'
import Select from './Controls/Select'

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			paras: 4,
			html: 'plaintext',
			text:''
		}
	}

	componentWillMount(){
		this.getText();
	}

	getText(){
		axios.get('http://loripsum.net/api/'+this.state.paras+'/'+this.state.html+'')
		//axios.get('http://loripsum.net/api/4/')
			.then((response) => {
				//this.setState({text: response.data.text}, function(){
				this.setState({text: response.data}, function(){
					//console.log(this.state);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	changeParas(number){
		this.setState({paras: number}, this.getText);
	}
	
	showHtml(x){
		this.setState({html: x}, this.getText);
	}

	render(){
		return(
			<div className="container">
			<h1>DummyText Generator</h1>
			<Output value={this.state.text} />
			<h3>Real Time Options</h3>
			<form>
				<div>
					<label>Paragraphs: </label>
					<Text value={this.state.paras} onChange={this.changeParas.bind(this)} />
				</div>
				<div>
					<label>Include HTML: </label>
					<Select value={this.state.html} onChange={this.showHtml.bind(this)} />
				</div>
			</form>
			</div>
		);
	}
}

export default App;