import React, { Component } from 'react'
import { Route, Link, NavLink, Switch } from 'react-router-dom'
import Home from './pages/Home'
import MyQuestions from './pages/users/MyQuestions'
import NewQuestion from './pages/users/NewQuestion'
import AllQuestions from './pages/doctors/AllQuestions'
import MyChats from './pages/doctors/MyChats'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Impressum from './pages/Impressum'
import api from '../api'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid"

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
          <header>
            <Grid container justify="space-between" alignContent='center'>
              <h1 className="App-title">HS Be strong | Medizinischer Online Kontakt</h1>
              <h3 className="username">Hallo {this.state.user ? this.state.user.username : "Anonymous"}</h3>
            </Grid>
          </header>
          <Grid container justify='center'>
            <nav className="navbar">
              <NavLink to="/">
                Home
                </NavLink>
              {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
              {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
              {api.isLoggedIn() && api.isDoctor() && <NavLink to="/doctor/allQuestions">Alle Unbeantworteten Fragen</NavLink>}
              {api.isLoggedIn() && api.isDoctor() && <NavLink to="/doctor/myChats">Meine Chats</NavLink>}
              {api.isLoggedIn() && api.isUser() && <NavLink to="/user/myQuestions">Meine Fragen</NavLink>}
              {api.isLoggedIn() && api.isUser() && <NavLink to="/user/newQuestion">Neue Frage erstellen</NavLink>}
              {api.isLoggedIn() && (
                <Link to="/" onClick={e => this.handleLogoutClick(e)}>
                  Logout
                </Link>
              )}
              <NavLink to="/impressum">
                Impressum
                </NavLink>
            </nav>
          </Grid>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/doctor/allQuestions" component={(api.isLoggedIn() && api.isDoctor()) ? AllQuestions : Home} />
            <Route path="/doctor/myChats" component={(api.isLoggedIn() && api.isDoctor()) ? MyChats : Home} />
            <Route path="/user/myQuestions" component={(api.isLoggedIn() && api.isUser()) ? MyQuestions : Home} />
            <Route path="/user/newQuestion" component={(api.isLoggedIn() && api.isUser()) ? NewQuestion : Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/impressum" component={Impressum} />
            <Route render={() => <h2>404</h2>} />
          </Switch>
        </div>
      </ThemeProvider>
    )
  }
}
