import { AppDispatch } from './';

const ADD_TRANSACTION = 'transactions/ADD_TRANSACTION';
const ADD_TRANSACTIONS = 'transactions/ADD_TRANSACTIONS';
const ADD_HISTORY = 'transactions/ADD_HISTORY';
const ADD_QUOTE = 'transactions/ADD_QUOTE';

interface TransactionData {
  symbol: string;
  shares: number;
}

interface Transaction {
  id: number;
  timestamp: string;
  user_id: number;
  stock: string;
  price: number;
  bought: number;
  sold: number;
  total: string;
  holdings: number;
  errors?: string[];
}

interface Quote {
  errors?: string[];
  name: string;
  price: number;
  symbol: string;
}

const addTransaction = (transaction: Transaction) => ({
  type: ADD_TRANSACTION,
  payload: transaction,
});

const addTransactions = (transactions: Transaction[]) => ({
  type: ADD_TRANSACTIONS,
  payload: transactions,
});

const addHistory = (transactions: Transaction[]) => ({
  type: ADD_HISTORY,
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

export const getHistory = () => async (dispatch: AppDispatch) => {
  const res: Response = await fetch('/api/stocks/history');
  const history: Transaction[] = await res.json();
  dispatch(addHistory(history));
  return history;
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

const initialState = { errors: [], quote: null, history: null };

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: {
    [buyStock.fulfilled]: (state, action) => {
      state[action.id] = action.payload;
    },
    [buyStock.rejected]: (state, action) => {
      state.errors = action.payload;
    },
    [getHistory.fulfilled]: (state, action) => {
      state.history = action.payload;
    },
    [getQuote.fulfilled]: (state, action) => {
      state.quote = action.payload;
    },
    [getQuote.rejected]: (state, action) => {
      state.errors = action.payload;
    },
    [sellStock.fulfilled]: (state, action) => {
      action[action.id] = action.payload;
    },
    [sellStock.rejected]: (state, action) => {
      state.errors = action.payload;
    },
  },
});

export default transactionsSlice.reducer;
