import React, { Component } from 'react';
import ReactDOM from 'react-dom';
var isSentTyping = false;

class MessageForm extends Component {
	render() {
		return (
			<div className="messageform">
				<form onSubmit={this.onSubmit.bind(this)}>
					<input type="text" className="form-control" ref="text" placeholder="Type a message..." onChange={this.onTyping.bind(this)} />
				</form>
			</div>
		)
	}

	onSubmit(e) {
		e.preventDefault();
		isSentTyping = false;

		this.props.emit('messageAdded', {
			timeStamp: Date.now(),
			text: this.refs.text.value.trim(),
			user: this.props.user.name,
			isStatusMessage: false
		});

		// Clear Form
		this.refs.text.value = '';
	}

	onTyping(e) {
		e.preventDefault();
		if (!isSentTyping && this.refs.text.value != null && this.refs.text.value != '') {
			this.props.emit('typing', {
				timeStamp: Date.now(),
				text: this.props.user.name + ' is typing...',
				user: this.props.user.name,
				isStatusMessage: true
			});

			isSentTyping = true;
		}
	}
}

export default MessageForm