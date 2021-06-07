import { AnyAction } from 'redux';
import { AppDispatch, TransactionData, Transaction, Quote } from './';

const ADD_TRANSACTION = 'transactions/ADD_TRANSACTION';
const ADD_TRANSACTIONS = 'transactions/ADD_TRANSACTIONS';
const ADD_QUOTE = 'transactions/ADD_QUOTE';

const addTransaction = (transaction: Transaction) => ({
  type: ADD_TRANSACTION,
  payload: transaction,
});

const addTransactions = (transactions: Transaction[]) => ({
  type: ADD_TRANSACTIONS,
  payload: transactions,
});

const addQuote = (quote: Quote) => ({
  type: ADD_QUOTE,
  payload: quote,
});

export const buyStock = (data: TransactionData) => async (dispatch: AppDispatch) => {
  const res: Response = await fetch('/api/stocks/buy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const transaction: Transaction = await res.json();
  if (!transaction.errors) {
    dispatch(addTransaction(transaction));
  }
  return transaction;
};

export const getPortfolio = () => async (dispatch: AppDispatch) => {
  const res: Response = await fetch('/api/stocks');
  const portfolio: Transaction[] = await res.json();
  dispatch(addTransactions(portfolio));
  return portfolio;
};

export const getQuote = (symbol: string) => async (dispatch: AppDispatch) => {
  const res: Response = await fetch(`/api/stocks/quote?stock=${symbol}`);
  const quote: Quote = await res.json();
  if (!quote.errors) {
    dispatch(addQuote(quote));
  }
  return quote;
};

export const sellStock = (data: TransactionData) => async (dispatch: AppDispatch) => {
  const res: Response = await fetch('/api/stocks/sell', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const transaction: Transaction = await res.json();
  if (!transaction.errors) {
    dispatch(addTransaction(transaction));
  }
  return transaction;
};

const initialState = { errors: [], quote: null, history: new Array() };

const transactionsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        [action.payload?.id]: action.payload,
        history: (new Set(...state.history)).add(action.payload?.id),
      };
    case ADD_TRANSACTIONS:
      return {
        ...state,
        ...Object.fromEntries(action.payload?.map!((transaction: Transaction) => [transaction.id, transaction]))
      };
    case ADD_QUOTE:
      return {
        ...state,
        quote: action.payload,
      };
    default:
      return state;
  }
};

export default transactionsReducer;
