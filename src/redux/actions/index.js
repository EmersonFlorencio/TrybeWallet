export const LOGIN = 'LOGIN';
export const GET_CURRENCIES_SUCESS = 'CURRENCIES_SUCESS';
export const GET_CURRENCIES_FAILURE = 'CURRENCIES_FAILURE';

export const login = (payload) => ({ type: LOGIN, payload });

const currenciesSucess = (currencies) => ({
  type: GET_CURRENCIES_SUCESS,
  currencies,
});

const currenciesFailure = (error) => ({
  type: GET_CURRENCIES_FAILURE,
  error,
});

export const getCurrencies = () => async (dispatch) => {
  try {
    const CURRENCIES_API = 'https://economia.awesomeapi.com.br/json/all';

    const response = await fetch(CURRENCIES_API);
    const data = await response.json();
    console.log(data);
    const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');
    dispatch(currenciesSucess(currencies));
  } catch (error) {
    dispatch(currenciesFailure(error.massage));
  }
};
