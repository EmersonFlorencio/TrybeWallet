import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      totalExpense: 0,
    };
  }

  render() {
    console.log(this.props);
    const { email } = this.props;
    const { totalExpense } = this.state;
    return (
      <div>
        <p data-testid="email-field">
          {email}
        </p>
        <p data-testid="total-field">
          { totalExpense }
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
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
