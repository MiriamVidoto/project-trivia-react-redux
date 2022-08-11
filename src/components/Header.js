import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScore } from '../redux/actions';

class Header extends Component {
  getGravatarEmail = (email) => md5(email).toString();

  render() {
    const { name, score, email, restTime, dificult, scoreget } = this.props;
    const ten = 10;
    const hardN = 3;
    const testDificult = () => {
      if (dificult === 'hard') { return hardN; }
      if (dificult === 'medium') { return 2; }
      if (dificult === 'easy') { return 1; }
    };
    const blabla = () => {
      if (dificult) {
        return ten + (restTime * testDificult());
      }
      return 0;
    };
    scoreget(blabla());
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${this.getGravatarEmail(
            email,
          )}` }
          alt={ `gravatar de ${email}` }
        />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">{score}</span>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  restTime: PropTypes.string.isRequired,
  dificult: PropTypes.string.isRequired,
  scoreget: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  name: store.playReducer.player.name,
  score: store.playReducer.score,
  email: store.playReducer.player.gravatarEmail,
  restTime: store.playReducer.restTime,
  dificult: store.playReducer.dificult,
});

const mapDispatchToProps = (dispatch) => ({
  scoreget: (payload) => (dispatch(getScore(payload))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
