import { AnyAction } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import type { RootState, AppDispatch } from './types.d';

export type ReduxDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useAppDispatch = (): ReduxDispatch => useDispatch<ReduxDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
