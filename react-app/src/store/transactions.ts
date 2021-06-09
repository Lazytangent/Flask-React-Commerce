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
  if (res.ok) {
    dispatch(addTransactions(portfolio));
  }
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

const createList = (state: number[], newlist: Transaction[]) => {
  const set = new Set(state);
  for (const transaction of newlist) {
    set.add(transaction.id);
  }
  return Array.from(set);
};

const initialState = { list: [], errors: [], quote: null, history: [] };

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
        ...Object.fromEntries(action.payload?.hist?.map!((transaction: Transaction) => [transaction.id, transaction])),
        list: createList(state.list, action.payload.hist),
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
