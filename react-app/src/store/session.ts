import { AnyAction } from 'redux';
import { AppDispatch, User, UserData, SessionState } from './';

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

const setUser = (user: User) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

export const login = (userData: UserData) => async (dispatch: AppDispatch) => {
  const res: Response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const user: User = await res.json();
  if (!user.errors) {
    dispatch(setUser(user));
  }
  return user;
};

export const authenticate = () => async (dispatch: AppDispatch) => {
  const res: Response = await fetch('/api/auth');
  const user: User = await res.json();
  if (!user.errors) {
    dispatch(setUser(user));
  }
  return user;
};

export const logout = () => async (dispatch: AppDispatch) => {
  const res: Response = await fetch('/api/auth/logout');
  const msg: string = await res.json();
  dispatch(removeUser());
  return msg;
};

export const signup = (userData: UserData) => async (dispatch: AppDispatch) => {
  const res: Response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const user: User = await res.json();
  if (!user.errors) {
    dispatch(setUser(user));
  }
  return user;
};

const initialState: SessionState = {
  user: null,
};

const sessionReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default sessionReducer;
