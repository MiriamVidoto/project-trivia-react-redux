import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  render() {
    const { player } = this.props;
    return (
      <div>
        <image
          data-testid="header-profile-picture"
          src={ player.gravatarEmail }
          alt={ player.gravatarEmail }
        />
        <h3 data-testid="header-player-name">{player.name}</h3>
        <p data-testid="header-score">{player.score}</p>
      </div>
    );
  }
}

Feedback.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    assertions: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  player: state.playReducer.player,
});

export default connect(mapStateToProps)(Feedback);
