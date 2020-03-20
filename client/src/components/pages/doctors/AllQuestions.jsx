import React, { Component } from 'react'
import api from '../../../api'

export default class AllQuestions extends Component {
  state = {
    opendChats: []
  }
  componentDidMount() {
    api.findAllChatsNoDoctor()
      .then(response => {
        console.log(response)
        this.setState({ opendChats: response })
      })
      .catch(err => console.log(err))
  }
  acceptChat = (chatId) => {
    api.addDoctorToChat(chatId)
  }
  render() {
    return <div>AllQuestions doctors display here
      {this.state.opendChats.map((chat, i) => {
      return (<div key={i}>
        {chat.title}
        <button onClick={(e) => this.acceptChat(chat._id)}>Frage annehmen und beantworten</button>
      </div>)
    })}
    </div>
  }
}
