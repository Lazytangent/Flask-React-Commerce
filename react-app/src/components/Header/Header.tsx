import { useState } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store";

import { logout } from "../../store/session";
import Signup from "../Signup";
import Login from "../Login";
import Notifications from '../Notifications';

const Header = () => {
  const dispatch = useAppDispatch();
  const sessionUser = useAppSelector((state) => state.session.user);

  const [showNavbar, setShowNavbar] = useState(false);

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
                  <Link to="/">Home</Link>
                </li>
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
      <Notifications />
    </nav>
  );
};

export default Header;
