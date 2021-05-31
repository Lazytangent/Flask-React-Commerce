import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "../../store";

import { logout } from "../../store/session";
import { useNotificationContext } from '../../context/Notification';
import Signup from "../Signup";
import Login from "../Login";
import Notifications from '../Notifications';

const Header = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state: RootState) => state.session.user);

  const [showNavbar, setShowNavbar] = useState(false);
  const { notifications } = useNotificationContext();

  return (
    <nav>
      <Link to="/">C$50 Finance</Link>
      <button onClick={() => setShowNavbar(!showNavbar)}>Navbar Toggle</button>
      {showNavbar && (
        <>
          {sessionUser ? (
            <div>
              <ul>
                <li>
                  <Link to="/quote">Quote</Link>
                </li>
                <li>
                  <Link to="/buy">Buy</Link>
                </li>
                <li>
                  <Link to="/sell">Sell</Link>
                </li>
                <li>
                  <Link to="/history">History</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to="/resetpwd">Reset Password</Link>
                </li>
                <li>
                  <button onClick={() => dispatch(logout())}>Log Out</button>
                </li>
              </ul>
            </div>
          ) : (
            <ul>
              <li>
                <Signup />
              </li>
              <li>
                <Login />
              </li>
            </ul>
          )}
        </>
      )}
      {notifications.length > 0 && <Notifications notifications={notifications} />}
    </nav>
  );
};

export default Header;
