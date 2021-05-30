import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
  'session/login',
  async (userData, { rejectWithValue }) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const user = await res.json();
    if (user.errors) {
      return rejectWithValue(user.errors);
    }
    return user;
  }
);

export const authenticate = createAsyncThunk(
  'session/authenticate',
  async (_, { rejectWithValue }) => {
    const res = await fetch('/api/auth');
    const user = await res.json();
    if (user.errors) {
      return rejectWithValue(user.errors);
    }
    return user;
  }
);

export const logout = createAsyncThunk(
  'session/logout',
  async () => {
    const res = await fetch('/api/auth/logout');
    const msg = await res.json();
    return msg;
  }
);

export const signup = createAsyncThunk(
  'session/signup',
  async (userData, { rejectWithValue }) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const user = await res.json();
    if (user.errors) {
      return rejectWithValue(user.errors);
    }
    return user;
  }
);

const sessionSlice = createSlice({
  name: 'session',
  initialState: { user: null, errors: [] },
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.errors = action.payload;
    },
    [authenticate.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [authenticate.rejected]: (state, action) => {
      state.errors = action.payload;
    },
    [logout.fulfilled]: (state, _) => {
      state.user = null;
    },
    [signup.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [signup.rejected]: (state, action) => {
      state.errors = action.payload;
    },
  },
});

export default sessionSlice.reducer;
