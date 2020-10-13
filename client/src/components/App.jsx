import React, { Component } from 'react'
import api from '../api'
import Grid from "@material-ui/core/Grid"
import Navbar from './Navbar'
import Footer from './Footer'
import Routes from './Routes'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
	typography: {
		fontFamily: [
			'Nunito',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif'
		].join(','),
	}
});

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: api.getUser()
		}
	}
	handleLogoutClick(e) {
		api.logout()
		window.location.reload()
	}

	render() {
		return (
			<ThemeProvider theme={theme}>
				<div className="App">
					<Navbar handleLogoutClick={this.handleLogoutClick} />
					<Grid className='mainContent'>
						<Routes user={this.state.user} />
					</Grid>
					<Footer />
				</div>
			</ThemeProvider >
		)
	}
}
