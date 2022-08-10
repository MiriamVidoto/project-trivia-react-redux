import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const rankingPlayers = [];
    return (
      <div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Home
        </button>
        {
          rankingPlayers.map((player, index) => (
            <div key={ index }>
              <img src=" " alt="" />
              <span data-testid={ `player-name-${index}` }>{player.name}</span>
              <span data-testid={ `player-score-${index}` }>{player.score}</span>
            </div>
          ))
        }
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
