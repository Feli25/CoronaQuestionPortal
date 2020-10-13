import React from 'react'
import api from '../../api'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Card, CardContent, CardActions, CardHeader, Grid, Button } from '@material-ui/core'

const StyledButton = withStyles({
	root: {
		marginTop: 25,
		background: 'rgba(6, 159, 249, 0.71)',
		borderRadius: 7,
		border: 0,
		color: 'white',
		height: 48,
		fontSize: '1.1rem',
		padding: '0 30px',
		'&:hover': {
			background: 'rgba(17, 184, 259, 0.71)',
			boxShadow: '0px 2px 3px gray'
		}
	},
	label: {
		textTransform: 'capitalize',
	},
})(Button);

class GlobalChat extends React.Component {

	findChatsByDoctor = () => {
		api.findChatsByDoctor()
			.then(response => {
				this.setState({ myChats: response })
				console.log("response", response)
			})
			.catch(err => { console.log(err) })
	}

	findChatsByUser = () => {
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

	findChats = () => {
		console.log("findingChats and update")
		api.findAllChatsNoDoctor()
			.then(response => {
				console.log(response)
				this.setState({ opendChats: response })
			})
			.catch(err => console.log(err))
	}

	acceptChat = (chatId) => {
		console.log("acceptingChat")
		api.addDoctorToChat(chatId)
		this.findChats()
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
							{chat._user.username ? <span>{chat._user.username}</span> : null}
							{chat.title}
						</Typography>
						<Typography variant='subtitle2'>{`${m}, ${day}.${year}`}</Typography>
					</li>
				)
			})}
		</ul>
	}

	chatCards() {
		return <Grid container justify='center' wrap='wrap' style={{ margin: 'auto', maxWidth: 900 }}>
			{this.state.opendChats.map((chat, i) => {
				var date = chat.created_at;
				var str = date.replace(/[^a-z0-9]/g, '.');
				var day = str.slice(8, 10);
				var month = date.slice(5, 7);
				var year = str.slice(0, 4);
				var m = this.renderSwitch(month);

				return <Card key={i} style={{ margin: 20, padding: 20 }}>
					<CardHeader
						title={chat._user.username}
						subheader={`${m}, ${day}.${year}`}
					/>
					<CardContent>
						<Typography>
							{chat.title}
						</Typography>
					</CardContent>
					<CardActions>
						<StyledButton
							variant='contained'
							onClick={(e) => this.acceptChat(chat._id)}
						>
							Frage annehmen und beantworten
							</StyledButton>
					</CardActions>
				</Card>
			})}
		</Grid>
	}

	render() {
		return <></>
	}
}

export default GlobalChat;