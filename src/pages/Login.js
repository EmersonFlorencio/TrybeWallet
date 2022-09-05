import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      password: '',
      buttonDisable: true,
    };
  }

  validButton = () => {
    const { user, password } = this.state;
    const min = 6;
    const validUser = (user.includes('@') && user.includes('.com'));
    const validPassword = (password.length >= min);
    if (validUser && validPassword === true) {
      this.setState({
        buttonDisable: false,
      });
    } else {
      this.setState({
        buttonDisable: true,
      });
    }
  };

  hendleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => { this.validButton(); });
  };

  hendleSubimit = () => {
    const { history, dispatch } = this.props;
    const { user } = this.state;
    dispatch(login(user));
    history.push('/carteira');
  };

  render() {
    const { buttonDisable, user, password } = this.state;
    return (
      <form className="Login">
        <h3 className="text-center">Login</h3>
        <input
          type="email"
          onChange={ this.hendleChange }
          placeholder="Email"
          data-testid="email-input"
          value={ user }
          name="user"
        />
        <input
          type="password"
          onChange={ this.hendleChange }
          placeholder="Senha"
          data-testid="password-input"
          value={ password }
          name="password"
        />
        <button
          disabled={ buttonDisable }
          type="submit"
          onClick={ this.hendleSubimit }
        >
          Entrar
        </button>

      </form>

    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
