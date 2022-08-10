import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { buttonDisable, stopTime } from '../redux/actions';
import './Questions.css';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      questionIndex: 0,
      redirect: false,
      loading: true,
      correct: '',
      incorrect: '',
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      this.setState({ redirect: true });
    }

    if (token) {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      console.log(response);
      const payload = await response.json();
      this.setState({
        questions: payload.results,
        redirect: this.validateToken(payload.response_code),
        loading: false,
      });
    }
  }

  validateToken = (response) => {
    const responseNumber = 3;
    if (response === responseNumber) {
      return true;
    }
  }

  getArrayAnwers = (question) => {
    const arrayAnwers = question.incorrect_answers.map((element, index) => ({
      id: index,
      answer: element,
    }));
    arrayAnwers.push({
      id: 4,
      answer: question.correct_answer,
    });
    return arrayAnwers;
  }

  handleClick = () => {
    const { stop, disableRest } = this.props;
    this.setState({
      correct: 'greenCorrect',
      incorrect: 'redIncorrect',
    });
    disableRest(true);
    stop(true);
  }

  render() {
    const { questions,
      questionIndex,
      redirect,
      loading,
      correct,
      incorrect,
    } = this.state;
    const { btnDisable } = this.props;
    const question = questions[questionIndex];
    const number = 4;
    const number2 = 0.5;

    if (loading) {
      return (<p>Carregando...</p>);
    }
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div>
          <h3 data-testid="question-category">{question.category}</h3>
          <h5 data-testid="question-text">{question.question}</h5>
          <div data-testid="answer-options">
            {
              this.getArrayAnwers(question)
                .sort(() => Math.random() - number2)
                .map((element, i) => (
                  element.id === number
                    ? (
                      <button
                        key={ i }
                        type="button"
                        data-testid="correct-answer"
                        className={ correct }
                        onClick={ this.handleClick }
                        disabled={ btnDisable }
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
                        disabled={ btnDisable }
                      >
                        {element.answer}
                      </button>)))
            }
          </div>
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  btnDisable: PropTypes.bool.isRequired,
  stop: PropTypes.func.isRequired,
  disableRest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  btnDisable: state.playReducer.btnDisable,
});
const mapDispatchToProps = (dispatch) => ({
  stop: (payload) => (dispatch(stopTime(payload))),
  disableRest: (payload) => (dispatch(buttonDisable(payload))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
