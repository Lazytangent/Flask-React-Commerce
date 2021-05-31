import { ReactNode, createContext, useContext, useState } from 'react';

interface Notification {
  notifications: string[];
  setNotifications: Function;
}

const NotificationContext = createContext({ notifications: [], setNotifications: () => null });
export const useNotificationContext = (): Notification => useContext(NotificationContext);

interface Props {
  children: ReactNode;
};

const NotificationProvider = ({ children }: Props) => {
  const [notifications, setNotifications] = useState([]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
