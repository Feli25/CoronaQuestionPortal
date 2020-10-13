import React, { Component } from 'react'
import api from '../../../api'
import ViewChat from '../ViewChat'
import { Typography } from '@material-ui/core'

export default class MyQuestions extends Component {
	state = {
		myChats: [],
		choosenChatId: null,
		open: false,
	}
	componentDidMount() {
		api.findChatsByUser()
			.then(response => {
				this.setState({ myChats: response })
				console.log("response", response)
			})
			.catch(err => { console.log(err) })
	}
	openChat = (chatId) => {
		this.setState({
			open: true,
			choosenChatId: chatId
		})
	}
	closeChat = () => {
		this.setState({
			open: false,
			choosenChatId: null
		})
	}
	renderSwitch(month) {
		switch (month) {
			case '01':
				return 'Jan';
			case '02':
				return 'Feb';
			case '03':
				return 'Mar';
			case '04':
				return 'Apr';
			case '05':
				return 'Mac';
			case '06':
				return 'Jun';
			case '07':
				return 'Jul';
			case '08':
				return 'Ago';
			case '09':
				return 'Sep';
			case '10':
				return 'Oct';
			case '11':
				return 'Nov';
			case '12':
				return 'Dec';
			default:
				return '';
		}
	}

	chatList() {
		return <ul>
			{this.state.myChats.map((chat, i) => {
				var date = chat.created_at;
				var str = date.replace(/[^a-z0-9]/g, '.');
				var day = str.slice(8, 10);
				var month = date.slice(5, 7);
				var year = str.slice(0, 4);
				var m = this.renderSwitch(month);
				return (
					<li key={i} onClick={() => this.openChat(chat._id)}>
						<Typography>
							{/* <span>{chat._doctor.username}</span> */}
							{chat.title}
						</Typography>
						<Typography variant='subtitle2'>{`${m}, ${day}.${year}`}</Typography>
					</li>
				)
			})}
		</ul>
	}

	render() {
		return <div className="displayChatsBox">
			<Typography variant="h5">
				Klicken Sie auf die Frage um den kompletten Chat zu sehen!
      </Typography>
			<div className="box">
				<Typography variant="h4">Hier sehen Sie alle Ihre Fragen</Typography>
				{this.chatList()}
			</div>
			<ViewChat
				open={this.state.open}
				onClose={this.closeChat}
				chatId={this.state.choosenChatId}
			/>
		</div>
	}
}
