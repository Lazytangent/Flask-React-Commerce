import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface User {
  id: number;
  username: string;
  email: string;
}

interface SessionState {
  user: User | null;
  errors: string[];
}

interface AuthErrors {
  errors: string[];
}

export const login = createAsyncThunk<
  User,
  User,
  {
    rejectValue: AuthErrors
  }
>(
  'session/login',
  async (userData, { rejectWithValue }) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const user = await res.json();
    if (user.errors) {
      return rejectWithValue((user.errors) as AuthErrors);
    }
    return user as User;
  }
);

export const authenticate = createAsyncThunk<
  User,
  undefined,
  {
    rejectValue: AuthErrors,
  }
>(
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

export const signup = createAsyncThunk<
  User,
  User,
  {
    rejectValue: AuthErrors,
  }
>(
  'session/signup',
  async (userData, { rejectWithValue }) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const user = await res.json();
    if (user.errors) {
      return rejectWithValue((user.errors) as AuthErrors);
    }
    return user as User;
  }
);

const sessionSlice = createSlice({
  name: 'session',
  initialState: { user: null, errors: [] } as SessionState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.errors = action.payload?.errors!;
    });
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(authenticate.rejected, (state, action) => {
      state.errors = action.payload?.errors!;
    });
    builder.addCase(logout.fulfilled, (state, _) => {
      state.user = null;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.errors = action.payload?.errors!;
    });
  },
});

export default sessionSlice.reducer;
