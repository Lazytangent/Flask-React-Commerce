import { useState } from 'react';

import styles from './Login.module.css';
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
      <form onSubmit={submitHandler} className={styles.form}>
        <h3 className={styles.heading}>Login</h3>
        <input
          className={styles.input}
          type="text"
          value={credential}
          placeholder="Username or Email"
          onChange={(e) => setCredential(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </>
  );
};

export default Login;
