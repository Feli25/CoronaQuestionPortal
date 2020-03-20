import React, { Component } from 'react'
import api from '../../api'
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
    return <dialog open={this.props.open} onClose={this.props.onClose} className="chatPopup">
      <button onClick={this.props.onClose}>X Schließen</button><br /><br />
      <div className="messagesContainer">
        {this.state.messages.map((messages, id) => {
          return (<div key={id} className={messages._creator === this.state.user._id ? "speechbubble sb1" : "speechbubble sb2"}>
            {messages.content}
          </div>)
        })}<br />
      </div>
      <input value={this.state.inputField} onChange={(e) => { this.setState({ inputField: e.target.value }) }} />
      <button onClick={this.submitNewMessage}>Nachricht senden ></button>
    </dialog>
  }
}
