import { AnyAction } from 'redux';
import { AppDispatch, User, LoginUserData, SignupUserData, SessionState, PasswordData } from './';

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const NEW_MESSAGE = 'session/NEW_MESSAGE';

const setUser = (user: User) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const newMessage = (message: string) => ({
  type: NEW_MESSAGE,
  payload: message,
});

export const login = (userData: LoginUserData) => async (dispatch: AppDispatch) => {
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

export const signup = (userData: SignupUserData) => async (dispatch: AppDispatch) => {
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

export const resetPwd = (passwordData: PasswordData) => async (dispatch: AppDispatch) => {
  const res: Response = await fetch('/api/auth/resetpwd', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(passwordData),
  });
  if (res.ok) {
    dispatch(newMessage('Password reset successfully'));
  }
};

const initialState: SessionState = {
  user: null,
  message: null,
};

const sessionReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    case NEW_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}

export default sessionReducer;
