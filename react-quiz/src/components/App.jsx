import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import QuestionList from './quiz/QuestionList.jsx';
import Scorebox from './quiz/Scorebox.jsx';
import Results from './quiz/Results.jsx';

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			questions: [
				{
					id: 1,
					text: 'What is your name?',
					choices: [
						{
						id: 'a',
						text: 'Michael'
						},
						{
						id: 'b',
						text: 'Chris'
						},
						{
						id: 'c',
						text: 'Gabe'
						}
					],
					correct: 'b'
				},
				{
					id: 2,
					text: 'What is your Chinchillas name?',
					choices: [
						{
						id: 'a',
						text: 'Bob'
						},
						{
						id: 'b',
						text: 'Chinchillo'
						},
						{
						id: 'c',
						text: 'Chinchilla'
						}
					],
					correct: 'c'
				},
				{
					id: 3,
					text: 'What is your Cars name?',
					choices: [
						{
						id: 'a',
						text: 'Fancy car'
						},
						{
						id: 'b',
						text: 'Sports wagon'
						},
						{
						id: 'c',
						text: 'Lovemobile'
						}
					],
					correct: 'a'
				},
				{
					id: 4,
					text: 'What is your girlfriends name?',
					choices: [
						{
						id: 'a',
						text: '2 dolla ho'
						},
						{
						id: 'b',
						text: 'No name bc no girlfriend'
						},
						{
						id: 'c',
						text: 'Candace'
						}
					],
					correct: 'c'
				},
			],
			score: 0,
			current: 1
		}
	}

	setCurrent(current){
		this.setState({current});
	}
	setScore(score){
		this.setState({score});
	}

	render(){
		if(this.state.current > this.state.questions.length){
			var scorebox = '';
			var results = <Results {...this.state} />
		} else {
			var scorebox = <Scorebox {...this.state} />
			results = '';
		}
		return(
			<div>
				{scorebox}
				<QuestionList {...this.state} setCurrent={this.setCurrent.bind(this)} setScore={this.setScore.bind(this)} />
				{results}
			</div>
		)
	}
}

export default App