import React, { Component } from 'react'
import api from '../api'
import { Link, NavLink } from 'react-router-dom'
import { Typography, Grid } from '@material-ui/core'

export default class Navbar extends Component {
	render() {
		return (
			<Grid container justify='center'>
				<nav className="navbar">
					<h1 className="App-title">HS Be strong | Medizinische Online Hilfe</h1>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<NavLink to="/"> <Typography> Home </Typography> </NavLink>
						{!api.isLoggedIn() && <NavLink to="/signup"><Typography>Signup</Typography></NavLink>}
						{!api.isLoggedIn() && <NavLink to="/login"><Typography>Login</Typography></NavLink>}
						{api.isLoggedIn() && api.isDoctor() && <NavLink to="/doctor/allQuestions"><Typography>Alle Unbeantworteten Fragen</Typography></NavLink>}
						{api.isLoggedIn() && api.isDoctor() && <NavLink to="/doctor/myChats"><Typography>Meine Chats</Typography></NavLink>}
						{api.isLoggedIn() && api.isUser() && <NavLink to="/user/myQuestions"><Typography>Meine Fragen</Typography></NavLink>}
						{api.isLoggedIn() && api.isUser() && <NavLink to="/user/newQuestion"><Typography>Neue Frage erstellen</Typography></NavLink>}
						{api.isLoggedIn() && (
							<Link to="/" onClick={e => this.props.handleLogoutClick(e)}>
								<Typography>Logout</Typography>
							</Link>
						)}
					</div>
				</nav>
			</Grid>
		)
	}
}
