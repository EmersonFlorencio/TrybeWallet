export const LOGIN = 'LOGIN';
export const GET_CURRENCIES_SUCESS = 'CURRENCIES_SUCESS';
export const GET_CURRENCIES_FAILURE = 'CURRENCIES_FAILURE';
export const ADD_EXPENSES_INFORMATIONS = 'ADD_EXPENSES_INFORMATIONS';
export const REMOVE_EXPENSES_INFORMATIONS = 'REMOVE_EXPENSES_INFORMATIONS';

export const login = (payload) => ({ type: LOGIN, payload });

const currenciesSucess = (currencies) => ({
  type: GET_CURRENCIES_SUCESS,
  currencies,
});

const currenciesFailure = (error) => ({
  type: GET_CURRENCIES_FAILURE,
  error,
});

export const addExpenses = (payload) => ({
  type: ADD_EXPENSES_INFORMATIONS,
  payload,
});

export const removeExpenses = (remove) => ({
  type: REMOVE_EXPENSES_INFORMATIONS,
  remove,
});

export const getCurrencies = () => async (dispatch) => {
  try {
    const CURRENCIES_API = 'https://economia.awesomeapi.com.br/json/all';

    const response = await fetch(CURRENCIES_API);
    const data = await response.json();
    const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');
    dispatch(currenciesSucess(currencies));
  } catch (error) {
    dispatch(currenciesFailure(error.massage));
  }
};
