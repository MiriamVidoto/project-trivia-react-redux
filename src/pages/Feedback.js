import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = { msg: 'Could be better...' };
  }

  componentDidMount() {
    this.getMsg();
  }

  getMsg = () => {
    const { assertions } = this.props;
    const numberAssertions = 3;
    if (assertions > numberAssertions) {
      this.setState({ msg: 'Well Done!' });
    }
  }

  render() {
    const { assertions, score, history } = this.props;
    const { msg } = this.state;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{ msg }</p>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (store) => ({
  assertions: store.player.assertions,
  score: store.player.score,
});

export default connect(mapStateToProps)(Feedback);
