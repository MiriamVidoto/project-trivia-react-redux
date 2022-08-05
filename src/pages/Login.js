import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      disabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateButton());
  }

  validateButton = () => {
    const { email, name } = this.state;
    const minimun = 3;
    const re = /\S+@\S+\.\S+/;
    const verify = re.test(email);
    if (name.length > minimun && verify) {
      this.setState({ disabled: false });
    }
  }

  handleClick = async () => {
    const { fetchAPI: actionApi, history } = this.props;
    await actionApi();
    const { token } = this.props;
    console.log(token);
    localStorage.setItem('token', token);
    history.push('/game');
  }

  render() {
    const { name, email, disabled } = this.state;
    return (
      <div>
        <input
          data-testid="input-player-name"
          type="text"
          name="name"
          value={ name }
          onChange={ this.handleChange }
          placeholder="Nome"
        />
        <input
          data-testid="input-gravatar-email"
          type="email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
          placeholder="Email"
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Play
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.playReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: (data) => dispatch(fetchAPI(data)),
});

Login.propTypes = {
  fetchAPI: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
