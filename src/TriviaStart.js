import React, {Component} from 'react';
import {withTrivia} from './TriviaProvider'
import { withRouter } from "react-router-dom"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


class TriviaStart extends Component {
	state = {
		categories: [],
		difficulty: 'easy',
		questions: '5',
		nine: '',
		9: '',
		10: '',
		11: '',
		12: '',
		13: '',
		14: '',
		15: '',
		16: '',
		17: '',
		18: '',
		19: '',
		20: '',
		21: '',
		22: '',
		23: '',
		24: '',
		25: '',
		26: '',
		27: '',
		28: '',
		29: '',
		30: '',
		31: '',
		32: ''
	}

	handleChange = (e) => {
		const target = e.target
		const value = target.type === "checkbox" ? (target.checked && this.state.categories.push(e.target.name)) : target.value //need to fix bug, doesn't remove if they uncheck
		const name = target.name
		this.setState({
			...this.state, [name]: value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.setOptions(parseInt(this.state.questions), this.state.categories, this.state.difficulty)
		setInterval(this.props.history.push('/trivia'), 500)
	}



	render() {
			const options = {
				'First': false,
				'Second': true,
				'Third': false
			}


	const triviaCategoryCheckBoxes = this.props.trivia_categories.map((category, i) => {
		return (
			<span key={i + category.id}>
				<label className='categoryCheckbox'>
					<input type='checkbox' name={i + 9} onChange={this.handleChange} />
					{category.name}
				</label>
			</span>
		)
	})
	return (
		<div className='triviaStartContainer'>

			<FormControlLabel
				control={
					<Checkbox
						checked={this.state['9']}
						onChange={this.handleChange}
						name='9'
						color='primary'
					/>
				}
				label='Primary'
			/>


			<form className='triviaStart' onSubmit={this.handleSubmit}>
				<label>Welcome to Trivia! Please choose your preferences for the upcoming game.</label>
				<hr />
				<fieldset required>
					<legend>Categories:</legend>
					{triviaCategoryCheckBoxes}
				</fieldset>
				<label>Difficulty:</label>
				<select name='difficulty' value={this.state.difficulty} onChange={this.handleChange}>
					<option value='easy'>Easy</option>
					<option value='medium'>Medium</option>
					<option value='hard'>Hard</option>
					<option value='mixed'>Mixed</option>
				</select>
				<label>Number of Questions: </label>
				<select name='questions' value={this.state.questions} onChange={this.handleChange}>
					<option value='5'>5</option>
					<option value='10'>10</option>
					<option value='15'>15</option>
					<option value='25'>25</option>
					<option value='50'>50</option>
				</select>
				<button>Start!</button>
				{/* <button onClick={() => console.log(this.props.questions)}>STAT BITCHES</button> */}
			</form>
		</div>
	)
}
}

export default withRouter(withTrivia(TriviaStart))
