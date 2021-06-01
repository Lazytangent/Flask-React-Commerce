import React, { useState } from 'react';

import { useAppDispatch } from '../../store';
import { login } from '../../store/session';

const Login = () => {
  const dispatch = useAppDispatch();

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ credential, password }));
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={credential}
          placeholder="Enter your username or email..."
          onChange={(e) => setCredential(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
