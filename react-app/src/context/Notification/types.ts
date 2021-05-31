import { ReactNode } from 'react';

export interface ContextProps {
  notifications: string[];
  setNotifications: Function;
}
export interface ProviderProps {
  children: ReactNode;
}
