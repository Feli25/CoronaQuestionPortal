import React, { Component } from 'react'
import api from '../../api'

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
      <div className="Signup">
        <h2>Signup</h2>
        <form>
          Username:{' '}
          <input
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleInputChange}
          />{' '}
          <br />
          Password:{' '}
          <input
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.handleInputChange}
          />{' '}
          <br />
          <button onClick={e => this.handleClick(e)}>Signup</button>
        </form>
        {this.state.message && (
          <div className="info info-danger">{this.state.message}</div>
        )}
      </div>
    )
  }
}
