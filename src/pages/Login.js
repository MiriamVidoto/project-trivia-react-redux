import React from 'react';

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
          onClick={ () => {} }
        >
          Play
        </button>
      </div>
    );
  }
}

export default Login;
