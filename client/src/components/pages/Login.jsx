import React, { Component } from 'react';
import api from '../../api';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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

export default class Login extends Component {
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
    api
      .login(this.state.username, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push('/') // Redirect to the home page
        window.location.reload();
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="login">
        <h2>Login</h2>
        <form>
          <TextField
            label="Username"
            className="input"
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleInputChange}
          />
          <TextField
            label="Password"
            className="input"
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.handleInputChange}
          />

          <StyledButton onClick={e => this.handleClick(e)}>Login</StyledButton>
        </form>
        {this.state.message && (
          <div className="info info-danger">{this.state.message}</div>
        )}
      </div>
    )
  }
}
