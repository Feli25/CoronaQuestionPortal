import React, { Component } from 'react'
import api from '../../../api'
import ViewChat from '../ViewChat'
import { Typography } from '@material-ui/core'

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
    return <div style={{ padding: 30 }}>
      <Typography variant="h6">MyQuestions users display here</Typography>
      {this.state.myChats.map((chat, i) => {
        return (<div key={i} onClick={() => this.openChat(chat._id)}>{chat.title}</div>)
      })}
      <ViewChat
        open={this.state.open}
        chatId={this.state.choosenChatId}
        onClose={this.closeChat}
      />
    </div>
  }
}
