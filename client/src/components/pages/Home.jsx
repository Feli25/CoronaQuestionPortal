import React, { Component } from 'react'
import { Typography } from '@material-ui/core'
import nurses from '../../images/doctor_pic.png'
export default class Home extends Component {
	render() {
		return (
			<div className="Home">
				<div className="homeContainer">
					<div>
						<Typography variant="h2">Wilkommen <br />auf unserer Hilfeseite</Typography>
						<Typography>
							Herzlich Willkommen auf der Seite für Medizinische Online Hilfe zum Thema COVID-19 im Kreis Heinsberg!
							<br />Wir werden hier nach bestem Wissen und Gewissen eure Fragen rund um eure gesundheitlichen Probleme beantworten!
							<br />Gerne dürft ihr anonym bleiben aber wenn ihr uns ein Paar Eckdaten verratet können wir euch vielleicht besser helfen!
							<br />Wir sind ein Kreis von Medizinern, die in Ihrer Freizeit versuchen euch zu helfen-deswegen würden wir uns freuen wenn nur ernst gemeinte medizinische Probleme an uns getragen werden.
							<br />Habt bitte Verständnis, dass es manchmal etwas Zeit braucht um euch zu antworten!

							<br />Wir geben unser Bestes und hoffen euch helfen zu können!

							<br />Bleibt zuhause-bleibt gesund-HS be strong!

							<br /><br />Um Fragen an unsere Ärzte zu stellen müssen Sie einen Account erstellen(Signup)<br />
							Sind sie eingeloggt, finden sie oben in der Menüleiste die verschiedenen Seiten
						</Typography>
					</div>
					<div className="img">
						<img src={nurses} alt="doctor and equipment" width='150%' />
					</div>
				</div>
			</div>
		)
	}
}
