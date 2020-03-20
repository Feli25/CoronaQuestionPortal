import React, { Component } from 'react'
import api from '../../../api'
import { Typography, Button, Card, CardContent, CardActions } from '@material-ui/core'

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
      Hier sehen sie alle offenen Fragen.<br />
      <Typography>
        Wenn sie auf Frage annehmen und beantworten klicken, wird die Frage unter Meine Chats verschoben!
      </Typography>
      {this.state.opendChats.map((chat, i) => {
        return (<div key={i}>
          <Card >
            <CardContent>
              <Typography variant="body2" component="p">
                {chat.title} von {chat._user.username}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant='contained'
                onClick={(e) => this.acceptChat(chat._id)}
              >
                Frage annehmen und beantworten
              </Button>
            </CardActions>
          </Card>
        </div>)
      })}
    </div>
  }
}
