import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store';
import { login } from '../../store/session';

const Login = () => {
  const dispatch = useAppDispatch();
  const sessionUser = useAppSelector((state) => state.session.user);

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e: Event) => {
    e.preventDefault();
    dispatch(login({ credential, password }));
  };

  return (
    <p>Login works</p>
  );
};

export default Login;
