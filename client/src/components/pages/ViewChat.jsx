import React, { Component } from 'react'
import api from '../../api';
import { Dialog, DialogTitle, DialogActions, DialogContent, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
//TODO settimeout so it automatically updates
export default class ViewChat extends Component {
	state = {
		messages: [],
		chatId: null,
		inputField: "",
		user: api.getUser()
	}
	componentDidUpdate() {
		if (this.props.chatId && this.props.chatId !== this.state.chatId) {
			this.interval = setInterval(() => this.updateMessages(), 3000);
			this.setState({ chatId: this.props.chatId })
			this.updateMessages()
		}
	}
	updateMessages = () => {
		api.findMessagesToChat(this.props.chatId)
			.then(response => {
				this.setState({ messages: response })
				console.log("response", response)
			})
			.catch(err => { console.log(err) })
	}
	submitNewMessage = () => {
		let data = {
			content: this.state.inputField
		}
		api.addNewMessageToChat(this.props.chatId, data)
		this.setState({ inputField: "" })
		this.updateMessages()
	}
	onClose = () => {
		clearInterval(this.interval);
		this.props.onClose()
	}

	render() {
		const { inputField } = this.state;
		return <>
			<Dialog fullWidth={true} scroll="paper" open={this.props.open} onClose={this.props.onClose}>
				<DialogTitle id="scroll-dialog-title" style={{ justifyContent: 'center', padding: '5px 25px' }}>
					<IconButton onClick={this.onClose} aria-label="upload picture" component="span" style={{ float: 'right' }}>
						<HighlightOffIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent style={{ maxHeight: 600, overflowY: 'auto', padding: '20px 20px' }}>
					<div>
						<div className="messagesContainer">
							{this.state.messages.map((messages, id) => {
								var str = messages.updated_at;
								var time = str.slice(11, 16)
								return <React.Fragment key={id}>
									<div className={messages._creator._id === this.state.user._id ? 'bubbleWraper' : 'bubbleWraper2'}>
										<Typography className="msg__header">{messages._creator.username}</Typography>
										<div className={messages._creator._id === this.state.user._id ? "speechbubble" : "speechbubble2"}>
											<Typography variant='subtitle1'>
												{messages.content}
											</Typography>
											<Typography style={{ textAlign: 'right' }}>{time}</Typography>
										</div>
									</div>
								</React.Fragment>

							})}
						</div>
					</div>
				</DialogContent>
				<DialogActions className="inputWrap">
					<input
						className="inputChat"
						value={this.state.inputField}
						placeholder="Type your message"
						onChange={(e) => { this.setState({ inputField: e.target.value }) }}
					/>
					<div style={{ flex: 0.5 }}>
						<IconButton disabled={inputField === "" && true} onClick={this.submitNewMessage} color="primary" aria-label="upload picture" component="span">
							<SendIcon />
						</IconButton>
					</div>
				</DialogActions>
			</Dialog>
		</>
	}
}
