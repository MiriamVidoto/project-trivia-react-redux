import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  getGravatarEmail = (email) => md5(email).toString();

  render() {
    const { name, score, email } = this.props;
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
};

const mapStateToProps = (store) => ({
  name: store.playReducer.player.name,
  score: store.playReducer.player.score,
  email: store.playReducer.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
