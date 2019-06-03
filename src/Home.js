import React, { Component } from "react"
import TriviaStart from './TriviaStart'
import {withTrivia} from './TriviaProvider'

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
