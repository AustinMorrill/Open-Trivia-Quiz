import React, {Component} from 'react';
import {withTrivia} from '../TriviaProvider'
import { withRouter } from "react-router-dom"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from "@material-ui/core/styles"
import orange from "@material-ui/core/colors/orange"
import FormControl from "@material-ui/core/FormControl"
import FormHelperText from "@material-ui/core/FormHelperText"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"

const OrangeCheckbox = withStyles({
	root: {
		color: orange[500],
		"&$checked": {
			color: orange[800]
		}
	},
	checked: {}
})(props => <Checkbox color='default' {...props} />)


class TriviaStart extends Component {
	state = {
		categories: [],
		difficulty: 'easy',
		questions: '5',
		9: true,
		10: false,
		11: false,
		12: false,
		13: false,
		14: false,
		15: false,
		16: false,
		17: false,
		18: false,
		19: false,
		20: false,
		21: false,
		22: false,
		23: false,
		24: false,
		25: false,
		26: false,
		27: false,
		28: false,
		29: false,
		30: false,
		31: false,
		32: false,
		all: false,
	}

	componentDidMount(){
		this.setState({
			categories: [],
			difficulty: 'easy',
			questions: '5',
		})
		this.props.resetOptions()
	}

	handleChange = (e) => {
		const target = e.target
		const value = target.type === "checkbox" ? (target.checked) : target.value
		const name = target.name
		this.setState({
			...this.state, [name]: value
		})
	}

	handleChangeAll = (e) => {
		const target = e.target
		const value = target.checked
		this.setState({
			[target.name]: value
		})
		for(let i = 9; i < 33; i++){
		this.setState({
			[i]: value
		})
	 }
	}

	handleSubmit = (e) => {
		e.preventDefault()
		Object.keys(this.state).map(i => this.state[i] === true ? this.state.categories.push(i) : null)		
		this.props.setOptions(parseInt(this.state.questions), this.state.categories, this.state.difficulty)
		this.props.history.push('/trivia')
	}

	render() {
	const triviaCategoryCheckBoxes = this.props.trivia_categories.map((category, i) => {
		const index = i + 9

		return (
			<FormControlLabel
				className='checkBox'
				key={i}
				control={
					<OrangeCheckbox
						checked={this.state[index]}
						onChange={this.handleChange}
						name={String(category.id)}
					/>
				}
				label={category.name}
			/>
		)
	})
	return (
		<div className='triviaStartContainer'>
			<form className='triviaStart' onSubmit={this.handleSubmit}>
				<label>Welcome to Trivia! Please choose your preferences for the upcoming game.</label>
				<div className='selectOptionsContainer'>
					<FormControl className='selectOptions'>
						<Select value={this.state.difficulty} onChange={this.handleChange} name='difficulty'>
							<MenuItem value={"easy"}>Easy</MenuItem>
							<MenuItem value={"medium"}>Medium</MenuItem>
							<MenuItem value={"hard"}>Hard</MenuItem>
							<MenuItem value={"mixed"}>Mixed</MenuItem>
						</Select>
						<FormHelperText>Select Difficulty</FormHelperText>
					</FormControl>
					<FormControl className='selectOptions'>
						<Select value={this.state.questions} onChange={this.handleChange} name='questions'>
							<MenuItem value={5}>Five</MenuItem>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={15}>Fifteen</MenuItem>
							<MenuItem value={25}>Twenty-Five</MenuItem>
							<MenuItem value={50}>Fifty</MenuItem>
						</Select>
						<FormHelperText>Select # of Questions</FormHelperText>
					</FormControl>
				</div>
				<fieldset className='fieldset' required>
					<legend>
						Choose which Categories you want each question to be randomly picked from
					</legend>
					<div className='checkBoxContainer'>
						{triviaCategoryCheckBoxes}
						<FormControlLabel
							className='checkBox'
							control={
								<OrangeCheckbox
									checked={this.state.all}
									onChange={this.handleChangeAll}
									name="all"
								/>
							}
							label='Choose All Categories'
						/>
					</div>
				</fieldset>

				<button className='btn-hover-start'>Start!</button>
				{/* <button onClick={() => console.log(this.props.questions)}>STAT BITCHES</button> */}
			</form>
		</div>
	)
}
}

export default withRouter(withTrivia(TriviaStart))
