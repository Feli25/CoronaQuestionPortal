import React from 'react'
import ViewChat from '../ViewChat';
import { Typography, Grid } from '@material-ui/core';
import GlobalChat from '../GlobalChat'

export default class MyChats extends GlobalChat {
	state = {
		myChats: [],
		choosenChatId: null,
		open: false
	}
	componentDidMount() {
		this.findChatsByDoctor()
	}
	render() {
		return <Grid container direction='column' alignItems='center'>
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
		</Grid>
	}
}
