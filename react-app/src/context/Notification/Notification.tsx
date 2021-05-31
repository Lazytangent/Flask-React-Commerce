import { createContext, useContext, useState } from 'react';
import { ContextProps, ProviderProps } from './types';

const NotificationContext = createContext<Partial<ContextProps>>({});
export const useNotificationContext = (): Partial<ContextProps> => useContext(NotificationContext);

const NotificationProvider = ({ children }: ProviderProps) => {
  const [notifications, setNotifications] = useState([]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
