import React, { Component } from 'react'
import { Route, Link, NavLink, Switch } from 'react-router-dom'
import Home from './pages/Home'
import MyQuestions from './pages/users/MyQuestions'
import NewQuestion from './pages/users/NewQuestion'
import AllQuestions from './pages/doctors/AllQuestions'
import MyChats from './pages/doctors/MyChats'
import Login from './pages/Login'
import Signup from './pages/Signup'
import api from '../api'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#007BA7',
    },
    secondary: {
      main: '#02e2f2'
    }
  },
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
          <header className="App-header" style={{ marginBottom: 100 }}>
            <h1 className="App-title">HS Be strong - Medizinische Hilfe</h1>
            <h3>Hallo {this.state.user ? this.state.user.username : "Anonymous"}</h3>
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
          </header>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/doctor/allQuestions" component={AllQuestions} />
            <Route path="/doctor/myChats" component={MyChats} />
            <Route path="/user/myQuestions" component={MyQuestions} />
            <Route path="/user/newQuestion" component={NewQuestion} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route render={() => <h2>404</h2>} />
          </Switch>
        </div>
      </ThemeProvider>
    )
  }
}
