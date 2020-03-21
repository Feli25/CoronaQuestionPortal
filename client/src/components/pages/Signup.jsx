import React, { Component } from 'react'
import api from '../../api'
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
      <div className="signup">
        <h2>Signup</h2>
        <form>
          <TextField
            className="input"
            label='Username'
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleInputChange}
          />
          <TextField
            className="input"
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
      </div>
    )
  }
}
