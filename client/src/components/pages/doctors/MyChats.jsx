import React, { Component } from 'react'
import api from '../../../api'

export default class MyChats extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     countries: [],
  //   }
  // }
  // render() {
  //   return (
  //     <div className="Countries">
  //       <h2>List of countries</h2>
  //       {this.state.countries.map(c => (
  //         <li key={c._id}>{c.name}</li>
  //       ))}
  //     </div>
  //   )
  // }
  // componentDidMount() {
  //   api
  //     .getCountries()
  //     .then(countries => {
  //       console.log(countries)
  //       this.setState({
  //         countries: countries,
  //       })
  //     })
  //     .catch(err => console.log(err))
  // }
  render() {
    return <div>MyChats doctors display here</div>
  }
}
