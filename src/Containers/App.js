import React from "react"
import "./App.css"
import { Switch, Route } from "react-router-dom"
import Navbar from "../Components/Navbar"
import About from "../About"
import TriviaContainer from "./TriviaContainer"
import TriviaStart from "../Components/TriviaStart"

const App = () => {
	return (
			<div className='appContainer'>
				<Navbar />
				<Switch>
					<Route exact path='/' component={TriviaStart} />
					<Route path='/about' component={About} />
					<Route path='/trivia' component={TriviaContainer} />
				</Switch>
			</div>
	)
}

export default App
