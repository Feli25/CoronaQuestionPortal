import React, { Component } from 'react'
import api from '../../../api'
import ViewChat from '../ViewChat'

export default class MyChats extends Component {
  state = {
    myChats: [],
    choosenChatId: null,
    open: false
  }
  componentDidMount() {
    api.findChatsByDoctor()
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
    return <div>Here the doctor can see all the chats he took to answer and answer the messages by clicking on the chat
      {this.state.myChats.map((chat, id) => {
      return (<div key={id} onClick={() => this.openChat(chat._id)}>
        {chat.title} by {chat._user.username}
      </div>)
    })}
      <ViewChat
        open={this.state.open}
        chatId={this.state.choosenChatId}
        onClose={this.closeChat}
      />
    </div>
  }
}
