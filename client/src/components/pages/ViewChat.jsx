import React, { Component } from 'react'
import api from '../../api'
import { Button, TextField } from '@material-ui/core'
//TODO settimeout so it automatically updates
export default class ViewChat extends Component {
  state = {
    messages: [],
    chatId: null,
    inputField: "",
    user: api.getUser()
  }
  componentDidUpdate() {
    if (this.props.chatId && this.props.chatId !== this.state.chatId) {
      this.setState({ chatId: this.props.chatId })
      this.updateMessages()
    }
  }
  updateMessages = () => {
    api.findMessagesToChat(this.props.chatId)
      .then(response => {
        this.setState({ messages: response })
        console.log("response", response)
      })
      .catch(err => { console.log(err) })
  }
  submitNewMessage = () => {
    let data = {
      content: this.state.inputField
    }
    api.addNewMessageToChat(this.props.chatId, data)
    this.setState({ inputField: "" })
    this.updateMessages()
  }
  render() {
    return <dialog open={this.props.open} onClose={this.props.onClose}>
      <button onClick={this.props.onClose}>X CLose</button><br /><br />
      <div className="messagesContainer">
        {this.state.messages.map((messages, id) => {
          console.log(messages, messages._creator === this.state.user._id)
          return (<div key={id} className={messages._creator === this.state.user._id ? "classRight" : "classLeft"}>
            {messages.content}
          </div>)
        })}<br />
      </div>
      <TextField value={this.state.inputField} onChange={(e) => { this.setState({ inputField: e.target.value }) }} />
      <Button variant='contained' color='primary' onClick={this.submitNewMessage}>Nachricht senden ></Button>
    </dialog>
  }
}
