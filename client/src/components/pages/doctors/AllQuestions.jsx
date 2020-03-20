import React, { Component } from 'react'
import api from '../../../api'

export default class AllQuestions extends Component {
  state = {
    opendChats: []
  }
  componentDidMount() {
    this.findChats()
  }
  findChats = () => {
    api.findAllChatsNoDoctor()
      .then(response => {
        console.log(response)
        this.setState({ opendChats: response })
      })
      .catch(err => console.log(err))
  }
  acceptChat = (chatId) => {
    api.addDoctorToChat(chatId)
    this.findChats()
  }
  render() {
    return <div>
      Explanation: All doctors can see all questions here and take one to their own and answer open ones
      Hier sehen sie alle offenen Fragen. Wenn sie auf Frage annehmen und beantworten klicken, wird die Frage unter Meine Chats verschoben!
      {this.state.opendChats.map((chat, i) => {
        return (<div key={i}>
          {chat.title} von {chat._user.username}{"          "}
          <button onClick={(e) => this.acceptChat(chat._id)}>Frage annehmen und beantworten</button>
        </div>)
      })}
    </div>
  }
}
