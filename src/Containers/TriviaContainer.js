import React, {Component} from "react"
import { withTrivia } from "../TriviaProvider"
import LoadingGif from "../Components/LoadingGif.js"
import Button from "@material-ui/core/Button"
import { withRouter } from "react-router-dom"
const classNames = require('classnames')


class TriviaContainer extends Component {
	state = {
		correctCounter: 0
	}

	increaseCorrectCounter = () => {
		this.setState(prevState => {
			return { correctCounter: prevState.correctCounter + 1 }
		})
	}

	render() {

		// let results = if((this.state.correctCounter / this.props.totalQuestions) > .8){
		// 	return <div className='victoryCondition'>Wow! You got over 80% of the answers correct, you rock!</div>
		// }else if ((this.state.correctCounter / this.props.totalQuestions) > .6){
		// 	return <div className='victoryCondition'>Congrats! You got over 60% of the answers correct, pretty good!</div>
		// } else if ((this.state.correctCounter / this.props.totalQuestions) > .4){
		// 	return <div className='victoryCondition'>You got over 40% of the answers correct, keep it up.</div>
		// } else if ((this.state.correctCounter / this.props.totalQuestions) > .2){
		// 	return <div className='victoryCondition'>Uh.... You only got over 20% of the answers correct, be best.</div>
		// } else if ((this.state.correctCounter / this.state.totalQuestion) > 0){
		// 	return <div className='victoryCondition'>Uh.... You got none right. Fail.</div>
		// }

		const checkCorrect = e => {
			e.preventDefault()
			this.props.increaseQuestionsCounter()
			if (e.target.value === this.props.correct_answer) {
				this.setState(prevState => {
					return { correctCounter: prevState.correctCounter + 1 }
				})
				alert("correct")
			} else {
				alert("incorrect")
				alert(`The correct answer is, ${this.props.correct_answer}`)
			}
			this.props.getXQuestions(1, this.props.categories, this.props.difficulty)
		}

		const triviaStarted = classNames("triviaContainer", {
			none: this.props.answerArray.length === 0
		})

			if (
				this.props.type === "boolean" &&
				this.props.questionsCounter < this.props.totalQuestions
			) {
				return (
					<div className={triviaStarted}>
						<form className='questionCard'>
							<label>{this.props.question}</label>
							<button className='btn-hover' value='True' onClick={checkCorrect}>
								True
							</button>
							<button className='btn-hover' value='False' onClick={checkCorrect}>
								False
							</button>
							<div className='questionInfo'>
								<div>Category: {this.props.category}</div>
								<div>
									Difficulty: {this.props.difficulty.charAt(0).toUpperCase() +this.props.difficulty.slice(1)}
								</div>
								<div>
									Question {this.props.questionsCounter + 1} of {this.props.totalQuestions}
								</div>
							</div>
						</form>
					</div>
				)
			} else if (
				this.props.type === "multiple" &&
				this.props.questionsCounter < this.props.totalQuestions
			) {
				return (
					<div className={triviaStarted}>
						<form className='questionCard'>
							<label>{this.props.question}</label>
							<button
								className='btn-hover'
								value={this.props.answerArray[0]}
								onClick={checkCorrect}
							>
								{this.props.answerArray[0]}
							</button>
							<button
								className='btn-hover'
								value={this.props.answerArray[1]}
								onClick={checkCorrect}
							>
								{this.props.answerArray[1]}
							</button>
							<button
								className='btn-hover'
								value={this.props.answerArray[2]}
								onClick={checkCorrect}
							>
								{this.props.answerArray[2]}
							</button>
							<button
								className='btn-hover'
								value={this.props.answerArray[3]}
								onClick={checkCorrect}
							>
								{this.props.answerArray[3]}
							</button>
							<div className='questionInfo'>
								<div>Category: {this.props.category}</div>
								<div>Difficulty: {this.props.difficulty.charAt(0).toUpperCase() + this.props.difficulty.slice(1)}</div>
								<div>
									Question {this.props.questionsCounter + 1} of {this.props.totalQuestions}
								</div>
							</div>
						</form>
					</div>
				)
			} else if (this.props.questionsCounter >= this.props.totalQuestions) {
				return (
					<div className={triviaStarted}>
						<div className='questionCard'>
							<h1>You got {this.state.correctCounter} answers correct.</h1>
							<br />
							<Button
								variant='outlined'
								color='inherit'
								onClick={() => setTimeout(this.props.history.push("/"), 500)}
							>
								Play again?
							</Button>
						</div>
					</div>
				)
			} else return <LoadingGif />
	}
}

export default withRouter(withTrivia(TriviaContainer))