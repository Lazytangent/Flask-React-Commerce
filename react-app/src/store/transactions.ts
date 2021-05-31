import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const ADD_TRANSACTION = 'transactions/ADD_TRANSACTION';

export const buyStock = createAsyncThunk(
  'transactions/buyStock',
  async (data, { rejectWithValue }) => {
    const res = await fetch('/api/stocks/buy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const stock = await res.json();
    if (stock.errors) {
      return rejectWithValue(stock.errors);
    }
    return stock;
  }
);

export const getPortfolio = createAsyncThunk(
  'transactions/getPortfolio',
  async () => {
    const res = await fetch('/api/stocks');
    const portfolio = await res.json();
    return portfolio;
  }
);

export const getHistory = createAsyncThunk(
  'transactions/getHistory',
  async () => {
    const res = await fetch('/api/stocks/history');
    const history = await res.json();
    return history;
  }
);

export const getQuote = createAsyncThunk(
  'transactions/getQuote',
  async (symbol, { rejectWithValue }) => {
    const res = await fetch(`/api/stocks/quote?stock=${symbol}`);
    const quote = await res.json();
    if (quote.errors) {
      return rejectWithValue(quote.errors);
    }
    return quote;
  }
);

export const sellStock = createAsyncThunk(
  'transactions/sellStock',
  async (data, { rejectWithValue }) => {
    const res = await fetch('/api/stocks/sell', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const transaction = await res.json();
    if (transaction.errros) {
      return rejectWithValue(transaction.errors);
    }
    return transaction;
  }
);

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
