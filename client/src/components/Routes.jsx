import React from 'react'
import api from '../api'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import MyQuestions from './pages/users/MyQuestions'
import NewQuestion from './pages/users/NewQuestion'
import AllQuestions from './pages/doctors/AllQuestions'
import MyChats from './pages/doctors/MyChats'
import Login from './pages/Login'
import Signup from './pages/Signup'

export default function Routes() {
	return (
		<>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/doctor/allQuestions" component={(api.isLoggedIn() && api.isDoctor()) ? AllQuestions : Home} />
				<Route path="/doctor/myChats" component={(api.isLoggedIn() && api.isDoctor()) ? MyChats : Home} />
				<Route path="/user/myQuestions" component={(api.isLoggedIn() && api.isUser()) ? MyQuestions : Home} />
				<Route path="/user/newQuestion" component={(api.isLoggedIn() && api.isUser()) ? NewQuestion : Home} />
				<Route path="/signup" component={Signup} />
				<Route path="/login" component={Login} />
				<Route render={() => <h2>404</h2>} />
			</Switch>
		</>
	)
}
