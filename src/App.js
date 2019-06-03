import React from "react"
import "./App.css"
import { Switch, Route } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Home from "./Home"
import About from "./About"
import Contact from "./Contact"
import TriviaContainer from "./TriviaContainer"
import TriviaStart from "./TriviaStart"

const App = () => {
	return (
		<div>
			<Navbar />
			<Switch>
				<Route exact path='/' component={TriviaStart} />
				<Route path='/about' component={About} />
				<Route path='/contact' component={Contact} />
				<Route path='/trivia' component={TriviaContainer} />
			</Switch>
			<Footer />
		</div>
	)
}

export default App
