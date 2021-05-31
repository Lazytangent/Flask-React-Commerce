import { store } from './';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/** Session Types */
interface User {
  id: number;
  username: string;
  email: string;
  errors?: string[];
}

interface UserData {
  username: string;
  email: string;
  password: string;
}

interface SessionState {
  user: User | null;
}

interface SessionAction {
  type: string;
  payload: User | undefined;
}

