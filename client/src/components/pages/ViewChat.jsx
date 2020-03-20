import React, { Component } from 'react'
import api from '../../api';
import { TextField, Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
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
      this.interval = setInterval(() => this.updateMessages(), 1000);
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
  onClose = () => {
    clearInterval(this.interval);
    this.props.onClose()
  }
  render() {
    return <Dialog fullWidth={true} scroll="paper" open={this.props.open} onClose={this.props.onClose}>
      <DialogTitle id="scroll-dialog-title" style={{ justifyContent: 'center' }}>
        {/* <span>Your Chat</span> */}
        <IconButton onClick={this.onClose} aria-label="upload picture" component="span" style={{ float: 'right' }}>
          <HighlightOffIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ maxHeight: 600 }}>
        <DialogContentText>
          <div className="messagesContainer">
            {this.state.messages.map((messages, id) => {
              console.log(messages._creator === this.state.user._id)
              return <>
                <p className={messages._creator._id !== this.state.user._id && "titleDoctorChat"}>{messages._creator.username}</p>
                <div key={id} className={messages._creator._id === this.state.user._id ? "speechbubble" : "speechbubble2"}>
                  {messages.content}
                </div>
              </>

            })}<br />
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ borderTop: '1px solid silver' }}>
        <TextField
          fullWidth={true}
          variant='outlined'
          label="Type your message"
          value={this.state.inputField}
          onChange={(e) => { this.setState({ inputField: e.target.value }) }}
        />
        <IconButton onClick={this.submitNewMessage} color="primary" aria-label="upload picture" component="span">
          <SendIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  }
}
