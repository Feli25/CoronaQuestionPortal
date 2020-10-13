import React from 'react'
import { Typography } from '@material-ui/core'
import GlobalChat from '../GlobalChat'

export default class AllQuestions extends GlobalChat {
	state = {
		opendChats: []
	}
	componentDidMount() {
		this.findChats()
	}

	render() {
		return <div>
			{/* Explanation: All doctors can see all questions here and take one to their own and answer open ones */}
			<Typography variant='h4'>
				Hier sehen sie alle offenen Fragen.
			</Typography>
			<Typography variant='h5'>
				Wenn sie auf Frage annehmen und beantworten klicken, wird die Frage unter Meine Chats verschoben!
      </Typography>
			<div style={{ margin: 80, maxHeight: 650, overflowY: 'auto' }}>
				{this.chatCards()}
			</div>
		</div>
	}
}
