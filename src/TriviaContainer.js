import React, {Component} from "react"
import { withTrivia } from "./TriviaProvider"
import LoadingGif from "./LoadingGif"

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


		if (
			this.props.type === "boolean" &&
			(this.props.questionsCounter < this.props.totalQuestions)
		) {
			return (
				<div className={triviaStarted}>
					<div>
						<div>Category: {this.props.category}</div>
						<div>Difficulty: {this.props.difficulty}</div>
						<div>
							Question {this.props.questionsCounter + 1} of {this.props.totalQuestions}
						</div>
					</div>

					<form className='questionCard'>
						<label>{this.props.question}</label>
						<button className='btn-hover' value='True' onClick={checkCorrect}>
							True
						</button>
						<button className='btn-hover' value='False' onClick={checkCorrect}>
							False
						</button>
					</form>
				</div>
			)
		} else if (
							this.props.type === "multiple" &&
							this.props.questionsCounter < this.props.totalQuestions
						) {
							return (
								<div className={triviaStarted}>
									<div>Category: {this.props.category}</div>
									<div>Difficulty: {this.props.difficulty}</div>
									<div>
										Question {this.props.questionsCounter + 1} of{" "}
										{this.props.totalQuestions}
									</div>
									<form className='questionCard'>
										<label>{this.props.question}</label>
										<button className='btn-hover' value={this.props.answerArray[0]} onClick={checkCorrect}>
											{this.props.answerArray[0]}
										</button>
										<button className='btn-hover' value={this.props.answerArray[1]} onClick={checkCorrect}>
											{this.props.answerArray[1]}
										</button>
										<button className='btn-hover' value={this.props.answerArray[2]} onClick={checkCorrect}>
											{this.props.answerArray[2]}
										</button>
										<button className='btn-hover' value={this.props.answerArray[3]} onClick={checkCorrect}>
											{this.props.answerArray[3]}
										</button>
										<label>{this.props.correctAnswer}</label>
									</form>
								</div>
							)
						} else return <LoadingGif />
}
}

export default withTrivia(TriviaContainer)