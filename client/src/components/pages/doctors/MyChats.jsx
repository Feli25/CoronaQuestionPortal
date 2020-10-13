import React, { Component } from 'react'
import api from '../../../api'
import ViewChat from '../ViewChat';
// import OpenInNewIcon from '@material-ui/icons/OpenInNew';
// import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';

export default class MyChats extends Component {
	state = {
		myChats: [],
		choosenChatId: null,
		open: false
	}
	componentDidMount() {
		api.findChatsByDoctor()
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
			{this.state.myChats.map((chat, id) => {
				var date = chat.created_at;
				var str = date.replace(/[^a-z0-9]/g, '.');
				var day = str.slice(8, 10);
				var month = date.slice(5, 7);
				var year = str.slice(0, 4);
				var m = this.renderSwitch(month);
				return <li key={id} onClick={() => this.openChat(chat._id)}>
					<Typography>
						<span>{chat._user.username}</span>
						{chat.title}
					</Typography>
					<Typography variant='subtitle2'>{`${m}, ${day}.${year}`}</Typography>
				</li>
			})}
		</ul>
	}
	render() {
		return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			{/* Here the doctor can see all the chats he took to answer and answer the messages by clicking on the chat */}
			<Typography variant='h5'>
				Hier sehen Sie alle Fragen, die Sie sich zugewiesen haben.
			</Typography>
			<div className="box">
				<Typography variant='h4'> Klicken sie auf das Icon um den Chat zu öffnen! </Typography>
				{this.chatList()}
			</div>
			<ViewChat
				open={this.state.open}
				chatId={this.state.choosenChatId}
				onClose={this.closeChat}
			/>
		</div>
	}
}
