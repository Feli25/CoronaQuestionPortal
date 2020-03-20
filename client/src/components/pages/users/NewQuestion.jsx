import React, { Component } from 'react'
import api from '../../../api';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from '@material-ui/core';

export default class NewQuestions extends Component {
  state = {
    content: "",
    title: ""
  }
  handleClick = (e) => {
    e.preventDefault()
    console.log(this.state.content)
    let data = {
      content: this.state.content,
      title: this.state.title
    }
    api
      .addNewMessageAndChat(data)
      .then(result => {
        console.log('SUCCESS!')
        this.setState({
          content: '',
          title: "",
          message: 'Ihre Frage wurde gestellt, schauen sie unter Ihre Fragen nach',
        })
        setTimeout(() => {
          this.setState({
            message: null,
          })
        }, 2000)
      })
      .catch(err => this.setState({ message: err.toString() }))
  }
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  render() {
    return <div style={{ padding: 30 }}>
      <Typography variant="h6">
        {/* Explanation: Users can create new questions here<br /> */}
        Hier können Sie eine neue Fragen stellen! <br/>Diese wird dann so schnell wie möglich von unseren Ärzten beantwortet!
      </Typography>
      <form>
        <TextField
          variant="standard"
          label="Titel/Thema der Frage"
          type="text"
          value={this.state.title}
          name="title"
          onChange={this.handleInputChange}
          style={{ margin: 12 }}
        />
        <br />
        <TextField
          variant="standard"
          label="Inhalt"
          type="text"
          value={this.state.content}
          name="content"
          onChange={this.handleInputChange}
          style={{ margin: 12 }}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={e => this.handleClick(e)}
          style={{ margin: 12 }}
        >
          Frage stellen
        </Button>
      </form>
      {this.state.message && <div className="info">{this.state.message}</div>}

    </div>
  }
}
