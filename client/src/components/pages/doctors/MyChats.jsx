import React, { Component } from 'react'
import api from '../../../api'
import ViewChat from '../ViewChat';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import IconButton from '@material-ui/core/IconButton';

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
    return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Here the doctor can see all the chats he took to answer and answer the messages by clicking on the chat */}
      Hier sehen Sie alle Fragen, die Sie sich zugewiesen haben. Klicken sie auf das Icon um den Chat zu öffnen!<br/>
      {this.state.myChats.map((chat, id) => {
        return (<div key={id} className='chatList' onClick={() => this.openChat(chat._id)}>
          {chat.title} by {chat._user.username}
          <IconButton onClick={() => this.openChat(chat._id)} color="primary" aria-label="upload picture" component="span">
            <OpenInNewIcon />
          </IconButton>
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
