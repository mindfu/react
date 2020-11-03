import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Message from './Message.jsx';

class MessageList extends Component{
	render(){
		return(
			<div className="well">
				<h3>{this.props.user.name}</h3>
				{
					this.props.messages.map((message, i) => {
						return <Message message={message} key={i} user={this.props.user}/>
					})
				}
			</div>
		)
	}
}

export default MessageList