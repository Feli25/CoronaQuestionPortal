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
    return <div className="displayChatsBox">
      <Typography variant="h6">
        Hier sehen Sie alle Ihre Fragen. <br />
        Klicken Sie auf die Frage um den kompletten Chat zu sehen!
      </Typography>
      <div className="chatBox">
        {this.state.myChats.map((chat, i) => {
          return (
            <div key={i} onClick={() => this.openChat(chat._id)} className="chatTitle">
              {chat.title}
              <span>
                {chat._doctor && chat._doctor.username && " bearbeitet von " + chat._doctor.username}
              </span>
            </div>)
        })}
      </div>
      <ViewChat
        open={this.state.open}
        onClose={this.closeChat}
        chatId={this.state.choosenChatId}
      />
    </div >
  }
}
