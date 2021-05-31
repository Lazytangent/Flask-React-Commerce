import { useEffect } from 'react';
import { useNotificationContext } from '../../context/Notification';

const Notifications = () => {
  const { notifications, setNotifications } = useNotificationContext();

  useEffect(() => {
    if (notifications?.length) {
      const timeout = setTimeout(() => {
        setNotifications!((prev: string[]) => prev.slice(1));
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [notifications, setNotifications]);

  return (
    <>
      <p>Notifications work</p>
      {notifications?.map((notification: string) => <p>{notification}</p>)}
    </>
  );
};

export default Notifications;
