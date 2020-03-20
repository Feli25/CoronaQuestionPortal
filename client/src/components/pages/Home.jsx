import React, { Component } from 'react'
import { Typography } from '@material-ui/core'

export default class Home extends Component {
  render() {
    return (
      <div className="Home" style={{ margin: 20, padding: 30 }}>
        <Typography variant="h4">Wilkommen auf unserer Hilfeseite</Typography>
        <p>Um Fragen an unsere Ärzte zu stellen müssen Sie einen Account erstellen(Signup)<br />
          Sind sie eingeloggt, finden sie oben in der Menüleiste die verschiedenen Seiten
        </p>
      </div>
    )
  }
}
