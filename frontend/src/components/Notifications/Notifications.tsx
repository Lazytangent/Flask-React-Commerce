import { useNotificationContext } from '../../context/Notification';

const Notifications = () => {
  const { notifications, setNotifications } = useNotificationContext();

  return (
    <>
      <p>Notifications work</p>
      {notifications.map((notification: string) => <p>{notification}</p>)}
    </>
  );
};

export default Notifications;
