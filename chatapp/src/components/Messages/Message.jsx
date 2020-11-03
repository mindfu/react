import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Message extends Component {
	render() {
		const {message} = this.props;
		var formattedTime = this.formatTime(message.timeStamp);
		if (message.isStatusMessage && (message.user !== this.props.user.name)) {
			return (
				<div className='message'>
					<i>{message.text}</i>
				</div>
			)
		}

		if (message.isStatusMessage && (message.user === this.props.user.name)) {
			return (<div></div>);
		}

		return (
			<div className={(message.user !== this.props.user.name) ? 'message' : 'message highlight-message'}>
				<strong>{(message.user !== this.props.user.name) ? message.user : message.user }</strong>  {message.text} <span className="time">{formattedTime}</span>
			</div>
		)
	}

	formatTime(timestamp) {
		var dt = new Date(timestamp * 1000);

		var hours = dt.getHours();
		var minutes = dt.getMinutes();
		var seconds = dt.getSeconds();

		if (hours < 10) {
			hours = '0' + hours;
		}

		if (minutes < 10) {
			minutes = '0' + minutes;
		}

		if (seconds < 10) {
			seconds = '0' + seconds;
		}

		return hours + ":" + minutes + ":" + seconds
	}
}

export default Message