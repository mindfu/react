import React, { Component } from 'react';
import './App.css';
var uuid = require('uuid');
var firebase = require('firebase');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBp-MDfzfX6acIr1nYRHOyg9bWH1Jag9Ow",
  authDomain: "simplesurvey-reactjs.firebaseapp.com",
  databaseURL: "https://simplesurvey-reactjs.firebaseio.com",
  projectId: "simplesurvey-reactjs",
  storageBucket: "simplesurvey-reactjs.appspot.com",
  messagingSenderId: "946372730932"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: uuid.v1(),
      name: '',
      answers: {
        q1: '',
        q2: '',
        q3: '',
        q4: ''
      },
      submitted: false
    }

    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }

  handleNameSubmit(event){
    var name = this.refs.name.value;
    this.setState({name:name}, function(){
      console.log(this.state);
    });
    event.preventDefault();
  }

  handleQuestionSubmit(event){
    console.log('Questions Submitting...');
    firebase.database().ref('surveys/'+this.state.id).set({
      name: this.state.name,
      answers: this.state.answers
    });

    this.setState({submitted:true}, function(){
      console.log('Questions Submitted...');
    });
    event.preventDefault();
  }

  handleQuestionChange(event){
    var answers = this.state.answers;

    if(event.target.name === 'q1'){
      answers.q1 = event.target.value;
    } else if(event.target.name === 'q2'){
      answers.q2 = event.target.value;
    } else if(event.target.name === 'q3'){
      answers.q3 = event.target.value;
    } else if(event.target.name === 'q4'){
      answers.q4 = event.target.value;
    }
    this.setState({answers:answers}, function(){
      console.log(this.state);
    });
  }

  render() {
    var user; 
    var questions; 
    if(this.state.name && this.state.submitted === false){
        user = <h2>Welcome {this.state.name}</h2>
        questions = <span>
          <h3>Survery Questions</h3>
          <form onSubmit={this.handleQuestionSubmit.bind(this)}>
             <div>
              <label>What is your favorite Car?</label><br />
                <input type="radio" name="q1" value="Jeep" onChange={this.handleQuestionChange} /> Jeep<br />
                <input type="radio" name="q1" value="Mercedes Benz" onChange={this.handleQuestionChange} /> Mercedes Benz<br />
                <input type="radio" name="q1" value="Jaguar" onChange={this.handleQuestionChange} /> Jaguar<br />
                <input type="radio" name="q1" value="BMW" onChange={this.handleQuestionChange} /> BMW<br />
                <input type="radio" name="q1" value="Other" onChange={this.handleQuestionChange} /> Other<br />
             </div>
             <div>
              <label>What is your favorite Bank?</label><br />
                <input type="radio" name="q2" value="Capital One" onChange={this.handleQuestionChange} /> Capital One<br />
                <input type="radio" name="q2" value="Chase" onChange={this.handleQuestionChange} /> Chase<br />
                <input type="radio" name="q2" value="Citibank" onChange={this.handleQuestionChange} /> Citibank<br />
                <input type="radio" name="q2" value="Bank of New York" onChange={this.handleQuestionChange} /> Bank of New York<br />
                <input type="radio" name="q2" value="Other" onChange={this.handleQuestionChange} /> Other<br />
             </div>
             <div>
              <label>What is your favorite CryptoCurrency?</label><br />
                <input type="radio" name="q3" value="NEM/XEM" onChange={this.handleQuestionChange} /> NEM/XEM<br />
                <input type="radio" name="q3" value="Ripple" onChange={this.handleQuestionChange} /> Ripple<br />
                <input type="radio" name="q3" value="Ethereum" onChange={this.handleQuestionChange} /> Ethereum<br />
                <input type="radio" name="q3" value="Bitcoin" onChange={this.handleQuestionChange} /> Bitcoin<br />
                <input type="radio" name="q3" value="Other" onChange={this.handleQuestionChange} /> Other<br />
             </div>
             <div>
              <label>What is your favorite Job?</label><br />
                <input type="radio" name="q4" value="Doorman" onChange={this.handleQuestionChange} /> Doorman<br />
                <input type="radio" name="q4" value="SRBI" onChange={this.handleQuestionChange} /> SRBI<br />
                <input type="radio" name="q4" value="Accenture" onChange={this.handleQuestionChange} /> Accenture<br />
                <input type="radio" name="q4" value="Teds Hot Dogs" onChange={this.handleQuestionChange} /> Teds Hot Dogs<br />
                <input type="radio" name="q4" value="Other" onChange={this.handleQuestionChange} /> Other<br />
             </div>
             <input type="submit" name="Submit" />
          </form>
        </span>
    } else if(!this.state.name && this.state.submitted === false){
        user = <span>
          <h2>Please enter your name to begin the survey</h2>
          <form onSubmit={this.handleNameSubmit.bind(this)}>
            <input type="text" placeholder="Enter Name..." ref="name" />
          </form>
        </span>;
        questions = '';
    } else if(this.state.submitted === true){
        user = <h2>Thank you {this.state.name} for taking our survey.</h2>
    }

    return (
      <div className="App">
        <div className="App-header text-center">
          <h2>Simple Survey</h2>
        </div>
        <div className="text-center">
          {user}
        </div>
        <div className="container">
          {questions}
        </div>
      </div>
    );
  }
}

export default App;
