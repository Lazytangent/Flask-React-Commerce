import { store } from './';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/** Session Types */
export interface User {
  id: number;
  username: string;
  email: string;
  errors?: string[];
}

export interface LoginUserData {
  credential: string;
  password: string;
}

export interface SignupUserData {
  username: string;
  email: string;
  password: string;
}

export interface SessionState {
  user: User | null;
  message: string | null;
}

export interface PasswordData {
  oldpwd: string;
  newpwd: string;
}

/** Transaction Types */
export interface TransactionData {
  symbol: string;
  shares: number;
}

export interface Transaction {
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

export interface Quote {
  errors?: string[];
  name: string;
  price: number;
  symbol: string;
}
