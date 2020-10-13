import React, { Component } from 'react'
import api from '../../api'
import { TextField, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledButton = withStyles({
	root: {
		margin: 12,
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

const CustomTextField = withStyles({
	root: {
		background: '#fff',
		margin: '12px 0',
	}
})(TextField)

export default class Signup extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			message: null,
		}
		this.handleInputChange = this.handleInputChange.bind(this)
	}

	handleInputChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		})
	}

	handleClick(e) {
		e.preventDefault()
		if (!this.state.username || !this.state.password) {
			this.setState({ message: "Bitte alles ausfüllen" })
		} else {
			let data = {
				username: this.state.username,
				password: this.state.password,
			}
			api
				.findUserByName(data.username)
				.then(result => {
					if (result.length === 0) {
						api
							.signup(data)
							.then(result => {
								console.log('SUCCESS!')
								this.props.history.push('/') // Redirect to the home page
								window.location.reload();
							})
							.catch(err => this.setState({ message: err.toString() }))
					} else {
						this.setState({ message: "Diesen Namen gibt es bereits" })
					}
				})

		}
	}

	render() {
		return (
			<div className="form__container">
				<Typography variant='h2'>Signup</Typography>
				<form>
					<CustomTextField
						fullWidth
						label='Username'
						type="text"
						variant='outlined'
						value={this.state.username}
						name="username"
						onChange={this.handleInputChange}
					/>
					<CustomTextField
						fullWidth
						variant='outlined'
						label='Password'
						type="password"
						value={this.state.password}
						name="password"
						onChange={this.handleInputChange}
					/>
					<StyledButton onClick={e => this.handleClick(e)}>Signup</StyledButton>
				</form>
				{this.state.message && (
					<div className="info info-danger">{this.state.message}</div>
				)}
				<div className='big__circle'></div>
				<div className='medium__circle'></div>
				<div className='small__circle'></div>
			</div>
		)
	}
}
