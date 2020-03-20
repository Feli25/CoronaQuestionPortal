import React, { Component } from 'react'
import api from '../../../api'
import ViewChat from '../ViewChat'

export default class MyQuestions extends Component {
  state = {
    myChats: [],
    choosenChatId: null,
    open: false
  }
  componentDidMount() {
    api.findChatsByUser()
      .then(response => {
        this.setState({ myChats: response })
        console.log("response", response)
      })
      .catch(err => { console.log(err) })
  }
  openChat = (chatId) => {
    this.setState({
      open: true,
      choosenChatId: chatId
    })
  }
  closeChat = () => {
    this.setState({
      open: false,
      choosenChatId: null
    })
  }
  render() {
    return <div className="displayChatsBox">
      Explanation: Here the user can see all his done questions and read the answers from the doctors!<br />
      {this.state.myChats.map((chat, i) => {
        return (<div key={i} onClick={() => this.openChat(chat._id)} className="chatBox">
          {chat.title}{chat._doctor && chat._doctor.username && " bearbeitet von " + chat._doctor.username}</div>)
      })}
      <ViewChat
        open={this.state.open}
        chatId={this.state.choosenChatId}
        onClose={this.closeChat}
      />
    </div>
  }
}
