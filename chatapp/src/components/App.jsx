import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import MessageList from './Messages/MessageList.jsx'
import MessageForm from './Messages/MessageForm.jsx'
import UserList from './Users/UserList.jsx'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: 'disconnected',
			messages: [{
				timeStamp: Date.now(),
				text: "Welcome to ChatApp."
			}],
			users: [
				{
					name: 'Rob'
				},
				{
					name: 'Laura'
				}
			]
		}
	}

	componentWillMount() {
		this.socket = io('http://localhost:3000');
		this.socket.on('connect', this.connect.bind(this));
		this.socket.on('disconnect', this.disconnect.bind(this));
		this.socket.on('typing', this.onTypingMessage.bind(this));
		this.socket.on('messageAdded', this.onMessageAdded.bind(this));
	}

	connect() {
		this.setState({ status: 'connected' });
		console.log('Connected: ' + this.socket.id);
	}

	disconnect(users) {
		this.setState({ users: users });
		this.setState({ status: 'disconnected' });
	}

	onMessageAdded(message) {
		this.state.messages.pop();
		this.setState({ messages: this.state.messages.concat(message) });
	}

	onTypingMessage(message) {
		this.setState({ messages: this.state.messages.concat(message) });
	}

	emit(eventName, payload) {
		this.socket.emit(eventName, payload);
	}

	render() {
		return (
			<div className="row">
				{this.state.users.map((user, index) =>
					<div className="col-md-6" key={index}>
						<MessageList {...this.state} user={user} />
						<MessageForm {...this.state} user={user} emit={this.emit.bind(this)} />
					</div>
				)}
			</div>
		)
	}
}

export default App