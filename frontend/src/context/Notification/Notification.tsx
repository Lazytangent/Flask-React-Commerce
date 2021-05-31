import { ReactNode, createContext, useContext, useState } from 'react';

const NotificationContext = createContext({});
export const useNotificationContext = () => useContext(NotificationContext);

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
