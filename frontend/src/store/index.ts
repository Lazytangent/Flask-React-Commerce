import { configureStore } from '@reduxjs/toolkit';

import session from './session';
import transactions from './transactions';

export const store = configureStore({
  reducer: {
    session,
    transactions,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export * from './hooks';
