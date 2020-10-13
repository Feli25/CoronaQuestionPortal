import React from 'react'
import ViewChat from '../ViewChat'
import { Typography } from '@material-ui/core'
import GlobalChat from '../GlobalChat'

export default class MyQuestions extends GlobalChat {
	state = {
		myChats: [],
		choosenChatId: null,
		open: false,
	}
	componentDidMount() {
		this.findChatsByUser()
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
