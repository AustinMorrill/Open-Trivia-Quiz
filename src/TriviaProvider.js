import React, { Component } from 'react'
import Axios from 'axios'
const { Provider, Consumer } = React.createContext()
const api = "https://opentdb.com/api.php?"

class TriviaProvider extends Component {
	constructor() {
		super()
		this.state = {
			questionsArray: "",
			questionsCounter: 0,
			categories: [],
			category: "",
			type: "",
			difficulty: "",
			question: "",
			totalQuestions: 5,
			correct_answer: "",
			correctCounter: 0,
			answerArray: [],
			trivia_categories: [
				{
					id: 9,
					name: "General Knowledge"
				},
				{
					id: 10,
					name: "Entertainment: Books"
				},
				{
					id: 11,
					name: "Entertainment: Film"
				},
				{
					id: 12,
					name: "Entertainment: Music"
				},
				{
					id: 13,
					name: "Musicals & Theatres"
				},
				{
					id: 14,
					name: "Television"
				},
				{
					id: 15,
					name: "Video Games"
				},
				{
					id: 16,
					name: "Board Games"
				},
				{
					id: 17,
					name: "Science & Nature"
				},
				{
					id: 18,
					name: "Science: Computers"
				},
				{
					id: 19,
					name: "Science: Mathematics"
				},
				{
					id: 20,
					name: "Mythology"
				},
				{
					id: 21,
					name: "Sports"
				},
				{
					id: 22,
					name: "Geography"
				},
				{
					id: 23,
					name: "History"
				},
				{
					id: 24,
					name: "Politics"
				},
				{
					id: 25,
					name: "Art"
				},
				{
					id: 26,
					name: "Celebrities"
				},
				{
					id: 27,
					name: "Animals"
				},
				{
					id: 28,
					name: "Vehicles"
				},
				{
					id: 29,
					name: "Comics"
				},
				{
					id: 30,
					name: "Science: Gadgets"
				},
				{
					id: 31,
					name: "Japanese Anime & Manga"
				},
				{
					id: 32,
					name: "Cartoon & Animations"
				}
			]
		}
	}

	componentDidMount(){
			Axios.get("https://opentdb.com/api_token.php?command=request").then(response => {
				this.setState({
					apiToken: response.data.token
				})
			})
			console.log('provider mounted')
	}

	resetOptions = () => {
		this.setState({
			questionsArray: "",
			questionsCounter: 0,
			categories: [],
			category: "",
			type: "",
			difficulty: "",
			question: "",
			totalQuestions: 5,
			correct_answer: "",
			correctCounter: 0,
			answerArray: []
		})
	}

	setOptions = (questions, categories, difficulty) => {
		this.setState(
			{ totalQuestions: questions, categories: categories, difficulty: difficulty },
			() => this.getXQuestions(1, categories, difficulty)
			
		)
	}

	getXQuestions = (questions, categories, difficulty) => {
		if (this.state.questionsCounter < this.state.totalQuestions) {
			let newDifficulty = difficulty === "mixed" ? this.randomDifficulty() : difficulty
			let categoryGet = categories[Math.floor(Math.random() * this.state.categories.length)]
			Axios.get(
				api + `amount=${questions}&category=${categoryGet}&difficulty=${newDifficulty}&token=${this.state.apiToken}`
			).then(response => {
				console.log(response)
				const {
					category,
					type,
					difficulty,
					correct_answer,
					incorrect_answers
				} = response.data.results[0]
				const question = this.unescapeHtml(response.data.results[0].question)
				let answerArray = [correct_answer, ...incorrect_answers]
				answerArray =
					type === "boolean" ? answerArray : answerArray.map(answer => this.unescapeHtml(answer))
				if (type !== "boolean") {
					answerArray = this.shuffleArray(answerArray)
				}
				this.setState({
					category,
					type,
					difficulty,
					question,
					correct_answer,
					answerArray
				})
			})
		} else if (this.state.questionsCounter > this.state.totalQuestions) {
			alert("Game Over")
		}
	}

	randomDifficulty = () => {
		const items = ["easy", "medium", "hard"]
		return items[Math.floor(Math.random() * items.length)]
	}

	unescapeHtml = safe => {
		return safe
			.replace(/&amp;/g, "&")
			.replace(/&lt;/g, "<")
			.replace(/&gt;/g, ">")
			.replace(/&quot;/g, '"')
			.replace(/&#039;/g, "'")
			.replace(/&eacute;/g, "é")
			.replace(/&rsquo;/g, "'")
			.replace(/&ldquo;/g, "“")
			.replace(/&rdquo;/g, "”")
			.replace(/&shy;/g, "")
			.replace(/&oacute;/g, "ô")
			.replace(/&Eacute;/g, "É")
			.replace(/&euml;/g, "ë")
	}

	increaseQuestionsCounter = () => {
		this.setState(prevState => {
			return { questionsCounter: prevState.questionsCounter + 1 }
		})
	}


	randomChoice(arr) {
		return arr[Math.floor(arr.length * Math.random())]
	}

	shuffleArray = array => {
		let currentIndex = array.length
		let temporaryValue, randomIndex
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex)
			currentIndex -= 1
			// And swap it with the current element.
			temporaryValue = array[currentIndex]
			array[currentIndex] = array[randomIndex]
			array[randomIndex] = temporaryValue
		}
		return array
	}

	//categories General Knowledge: 9, Books: 10, Film: 11, Science & Nature: 17, Computers: 18, Mathematics: 19, Mythology: 20, Sports: 21, Geography: 22, History: 23, Politics: 24, Art: 25, Animals: 27

	checkCorrectAnswer = () => {}

	render() {
		return (
			<Provider
				value={{
					...this.state,
					getXQuestions: this.getXQuestions,
					checkCorrectAnswer: this.checkCorrectAnswer,
					getRandomCategory: this.getRandomCategory,
					shuffleArray: this.shuffleArray,
					unescapeHtml: this.unescapeHtml,
					setOptions: this.setOptions,
					increaseQuestionsCounter: this.increaseQuestionsCounter,
					resetOptions: this.resetOptions
				}}
			>
				{this.props.children}
			</Provider>
		)
	}
}

export default TriviaProvider;

export const withTrivia = C => props => (
  <Consumer>
    {value => <C {...value}{...props}/>}
  </Consumer>
)
