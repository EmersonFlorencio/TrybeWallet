import { ADD_EXPENSES_INFORMATIONS,
  GET_CURRENCIES_FAILURE,
  GET_CURRENCIES_SUCESS,
  REMOVE_EXPENSES_INFORMATIONS,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  error: null,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES_SUCESS:
    return { ...state,
      currencies: action.currencies,
      error: null,
    };
  case GET_CURRENCIES_FAILURE:
    return { ...state,
      error: action.error,
    };
  case ADD_EXPENSES_INFORMATIONS:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVE_EXPENSES_INFORMATIONS:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.remove),
    };
  default:
    return state;
  }
}

export default wallet;
