import React, { Component } from 'react'
import api from '../../../api'

export default class NewQuestions extends Component {
  state = {
    content: "",
    title: ""
  }
  handleClick = (e) => {
    e.preventDefault()
    console.log(this.state.content)
    let data = {
      content: this.state.content,
      title: this.state.title
    }
    api
      .addNewMessageAndChat(data)
      .then(result => {
        console.log('SUCCESS!')
        this.setState({
          content: '',
          title: "",
          message: 'Ihre Frage wurde gestellt, schauen sie unter Ihre Fragen nach',
        })
        setTimeout(() => {
          this.setState({
            message: null,
          })
        }, 2000)
      })
      .catch(err => this.setState({ message: err.toString() }))
  }
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  render() {
    return <div>
      Explanation: Users can create new questions here<br />
      Hier können Sie eine neue Frage stellen! Diese wird dann so schnell wie möglich von unseren Ärzten beantwortet!<br />
      <form>
        Titel der Frage:{' '}
        <input
          type="text"
          value={this.state.title}
          name="title"
          onChange={this.handleInputChange}
        />{' '}
        <br />
        Inhalt:{' '}
        <input
          type="text"
          value={this.state.content}
          name="content"
          onChange={this.handleInputChange}
        />{' '}
        <br />
        <button onClick={e => this.handleClick(e)}>Frage stellen</button>
      </form>
      {this.state.message && <div className="info">{this.state.message}</div>}

    </div>
  }
}
