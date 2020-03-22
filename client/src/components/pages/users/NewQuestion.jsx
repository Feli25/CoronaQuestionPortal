import React, { Component } from 'react'
import api from '../../../api';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledButton = withStyles({
  root: {
    marginTop: 25,
    background: 'rgba(6, 159, 249, 0.71)',
    borderRadius: 7,
    border: 0,
    color: 'white',
    height: 48,
    fontSize: '1.1rem',
    padding: '0 30px',
    '&:hover': {
      background: 'rgba(17, 184, 259, 0.71)',
      boxShadow: '0px 2px 3px gray'
    }
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

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
    return <>
      <div style={{ padding: 30 }}>
        <Typography variant="h6">
          {/* Explanation: Users can create new questions here<br /> */}
        Hier können Sie eine neue Fragen stellen! <br />Diese wird dann so schnell wie möglich von unseren Ärzten beantwortet!
        </Typography>
        <form style={{ marginTop: 40 }}>
          <TextField
            label="Titel/Thema der Frage"
            type="text"
            value={this.state.title}
            name="title"
            onChange={this.handleInputChange}
            style={{ margin: 12 }}
          />
          <br />
          <TextField
            label="Inhalt"
            type="text"
            value={this.state.content}
            name="content"
            onChange={this.handleInputChange}
            style={{ margin: 12 }}
          />
          <br />
          <StyledButton
            color="primary"
            onClick={e => this.handleClick(e)}
          >
            Frage stellen
          </StyledButton>
        </form>
        {this.state.message && <div className="info">{this.state.message}</div>}
      </div>
    </>
  }
}
