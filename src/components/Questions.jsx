import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      response: '',
      redirect: false,
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = async () => {
    const { token } = this.props;
    if (token.length > 0) {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const payload = await response.json();
      this.setState({
        questions: payload.results,
        response: payload.response_code,
      });
    }
    this.setState({ redirect: true });
  }

  render() {
    const { questions, response, redirect } = this.state;
    console.log(response);
    return (
      <div>
        {
          redirect && <Redirect to="/" />
        }
        {
          questions.map((question, index) => (
            <div key={ index }>
              <h3 data-testid="question-category">{question.category}</h3>
              <h5 data-testid="question-text">{question.question}</h5>
              <button type="button" data-testid="correct-answer">
                {question.correct_answer}
              </button>
              {question.incorrect_answers.map((element, i) => (
                <button
                  type="button"
                  data-testid={ `wrong-answer-${i}` }
                  key={ i }
                >
                  {element}

                </button>))}
            </div>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.playReducer.token,
});

Questions.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Questions);
