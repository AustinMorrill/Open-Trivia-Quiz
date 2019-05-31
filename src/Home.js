import React, { Component } from "react"
import TriviaContainer from './TriviaContainer'
import TriviaStart from './TriviaStart'
import {withTrivia} from './TriviaProvider'
import { Switch, Route } from "react-router-dom"

class Home extends Component {

	render() {
	return (
		<div className='mainContainer'>
			<TriviaStart />
		</div>
	)
	}
}

export default withTrivia(Home)
