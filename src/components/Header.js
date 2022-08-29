import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  sumDespesas = () => {
    const { expenses } = this.props;
    const exchange = expenses.map(({ value, currency, exchangeRates }) => (
      value * exchangeRates[currency].ask
    ));
    const soma = exchange.reduce((acc, curr) => curr + acc, 0).toFixed(2);
    return soma;
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          {email}
        </p>
        <p data-testid="total-field">
          { this.sumDespesas() }
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  exchangeRates: state.wallet.exchangeRates,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps)(Header);
