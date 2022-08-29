import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies, addExpenses } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  hendleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  hendleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await response.json();
    delete currencies.USDT;
    const { id } = this.state;
    const coutId = id + 1;
    this.setState({
      exchangeRates: currencies,
    });
    const { dispatch } = this.props;
    dispatch(addExpenses(this.state));
    this.setState({
      id: coutId,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        <input
          type="text"
          data-testid="value-input"
          value={ value }
          name="value"
          onChange={ this.hendleChange }
        />
        <input
          type="text"
          data-testid="description-input"
          value={ description }
          name="description"
          onChange={ this.hendleChange }
        />
        <select
          name="currency"
          data-testid="currency-input"
          value={ currency }
          onChange={ this.hendleChange }
        >
          {currencies.map((curr) => (
            <option key={ curr } value={ curr }>
              { curr }
            </option>
          ))}
        </select>
        <select
          data-testid="method-input"
          onChange={ this.hendleChange }
          value={ method }
          name="method"
        >
          <option valeu="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          onChange={ this.hendleChange }
          value={ tag }
          name="tag"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          type="submit"
          onClick={ this.hendleSubmit }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
