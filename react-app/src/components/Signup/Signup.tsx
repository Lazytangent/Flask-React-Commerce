import { useState } from 'react';

import styles from './Signup.module.css';
import { useAppDispatch } from '../../store';
import { signup } from '../../store/session';

const Signup = () => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(signup({ username, email, password }));
    }
  };

  return (
    <>
      <form onSubmit={submitHandler} className={styles.form}>
        <h3 className={styles.heading}>Signup</h3>
        <input
          className={styles.input}
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={styles.input}
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className={styles.button}>Signup</button>
      </form>
    </>
  );
};

export default Signup;
