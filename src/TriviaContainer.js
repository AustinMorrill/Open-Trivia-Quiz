import React, {Component} from "react"
import { withTrivia } from "./TriviaProvider"
const classNames = require('classnames')

class TriviaContainer extends Component {
	  state = {

		}

		render(){
		const checkCorrect = e => {
			e.preventDefault()
			this.props.increaseQuestionsCounter()
			e.target.value === this.props.correct_answer ? alert("correct") : alert("incorrect")
			this.props.getXQuestions(1, this.props.categories, this.props.difficulty)
		}
		

		const triviaStarted = classNames(
			'triviaContainer',
			{'none': (this.props.answerArray.length === 0)}
		)


		if(this.props.type === "boolean") {
			return (
				<div className={triviaStarted}>
					<div>
						{this.props.category}, Difficulty: {this.props.difficulty}
					</div>

					<form>
						<label>{this.props.question}</label>
						<button value='True' onClick={checkCorrect}>
							True
						</button>
						<button value='False' onClick={checkCorrect}>
							False
						</button>
					</form>
				</div>
			)
		} else if (this.props.type === "multiple"){
			return (
				<div className={triviaStarted}>
					<div>Category: {this.props.category}</div>
					<form>
						<label>{this.props.question}</label>
						<button value={this.props.answerArray[0]} onClick={checkCorrect}>
							{this.props.answerArray[0]}
						</button>
						<button value={this.props.answerArray[1]} onClick={checkCorrect}>
							{this.props.answerArray[1]}
						</button>
						<button value={this.props.answerArray[2]} onClick={checkCorrect}>
							{this.props.answerArray[2]}
						</button>
						<button value={this.props.answerArray[3]} onClick={checkCorrect}>
							{this.props.answerArray[3]}
						</button>
						<label>{this.props.correctAnswer}</label>
					</form>
				</div>
			)
		} else return (
			<div>Loading...</div>

		)
}
}

export default withTrivia(TriviaContainer)