import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getAssertions, getScore } from '../redux/actions';
import './Questions.css';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      redirect: false,
      questions: [],
      answers: [],
      questionIndex: 0,
      correct: '',
      incorrect: '',
      dificult: '',
      seconds: 30,
      restTime: 0,
      btnClicked: false,
      btnsDisable: false,
    };
    this.responseNumber = 3;
    this.time_limit = 0;
    this.milliseconds = 1000;
  }

  componentDidMount() {
    this.fetchQuestions();
    this.timer = setInterval(() => this.tick(), this.milliseconds);
  }

  componentDidUpdate(prevProps, prevState) {
    const { btnsDisable } = this.state;
    if (prevState.seconds === this.time_limit || btnsDisable) {
      clearInterval(this.timer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  fetchQuestions = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      this.setState({ redirect: true });
    }
    if (token) {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const payload = await response.json();
      this.setState({
        questions: payload.results,
        redirect: payload.response_code === this.responseNumber,
        loading: false,
      }, () => {
        const { questions, questionIndex, redirect } = this.state;
        if (!redirect) {
          this.getArrayAnwers();
          const dificult = questions[questionIndex].difficulty;
          this.setState({ dificult });
        }
      });
    }
  }

  getArrayAnwers = () => {
    const { questions, questionIndex } = this.state;
    const number2 = 0.5;
    const arrayAnwers = questions[questionIndex].incorrect_answers
      .map((element, index) => ({ id: index, answer: element }));
    arrayAnwers.push({ id: 4, answer: questions[questionIndex].correct_answer });
    arrayAnwers.sort(() => Math.random() - number2);
    this.setState({ answers: arrayAnwers });
  }

  tick = () => {
    const { seconds } = this.state;
    if (seconds === this.time_limit) {
      this.setState({ btnsDisable: true, seconds: 0 });
    } else {
      this.setState(
        (prevState) => ({
          seconds: prevState.seconds - 1,
        }),
      );
    }
  };

  testDificult = () => {
    const { dificult } = this.state;
    const hardN = 3;
    if (dificult === 'hard') { return hardN; }
    if (dificult === 'medium') { return 2; }
    if (dificult === 'easy') { return 1; }
  };

  scoreSum = () => {
    const ten = 10;
    const { restTime, dificult } = this.state;
    if (dificult) {
      return (ten + (restTime * this.testDificult()));
    }
    return 0;
  }

  handleClick = ({ target }) => {
    const { questions, questionIndex } = this.state;
    this.setState((prevState) => ({
      correct: 'greenCorrect',
      incorrect: 'redIncorrect',
      btnClicked: true,
      seconds: prevState.seconds,
      restTime: prevState.seconds,
    }));
    if (questions[questionIndex].correct_answer === target.innerText) {
      this.setState({ dificult: questions[questionIndex].difficulty });
      const { assertionsget, assertions, scoreget, score } = this.props;
      assertionsget((assertions + 1));
      const result = score + this.scoreSum();
      scoreget(result);
      clearInterval(this.timer);
    }
    clearInterval(this.timer);
  }

  nextQuestion = () => {
    const { questionIndex } = this.state;
    this.setState({
      questionIndex: questionIndex + 1,
      correct: '',
      incorrect: '',
      btnsDisable: false,
      seconds: 30,
    }, () => this.getArrayAnwers());
    setInterval(() => this.tick(), this.milliseconds);
  }

  render() {
    const { questions,
      questionIndex,
      answers,
      redirect,
      loading,
      correct,
      incorrect,
      btnClicked,
      btnsDisable,
      seconds,
    } = this.state;

    const question = questions[questionIndex];
    const number = 4;
    const finalQuestion = 4;

    if (loading) {
      return (<p>Carregando...</p>);
    }
    if (redirect) {
      return <Redirect to="/" />;
    }
    if (questionIndex > finalQuestion) {
      return <Redirect to="/feedback" />;
    }
    return (
      <div>
        <h3 data-testid="question-category">{question.category}</h3>
        <h5 data-testid="question-text">{question.question}</h5>
        <div data-testid="answer-options">
          {
            answers.map((element, i) => (
              element.id === number
                ? (
                  <button
                    key={ i }
                    type="button"
                    data-testid="correct-answer"
                    className={ correct }
                    onClick={ this.handleClick }
                    disabled={ btnsDisable }
                  >
                    {element.answer}
                  </button>)
                : (
                  <button
                    key={ i }
                    type="button"
                    data-testid={ `wrong-answer-${i}` }
                    className={ incorrect }
                    onClick={ this.handleClick }
                    disabled={ btnsDisable }
                  >
                    {element.answer}
                  </button>)))
          }
        </div>
        <div>
          <span>{`Você tem ${seconds} segundos para responder!`}</span>
          {btnClicked && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.nextQuestion }
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  scoreget: PropTypes.func.isRequired,
  assertionsget: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
  score: store.player.score,
  assertions: store.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  scoreget: (payload) => (dispatch(getScore(payload))),
  assertionsget: (payload) => (dispatch(getAssertions(payload))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
