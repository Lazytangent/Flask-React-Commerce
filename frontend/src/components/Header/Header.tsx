import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "../../store";

import { logout } from "../../store/session";
import Signup from "../Signup";
import Login from "../Login";

const Header = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state: RootState) => state.session.user);
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
    </nav>
  );
};

export default Header;
