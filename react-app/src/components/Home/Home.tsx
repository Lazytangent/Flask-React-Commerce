import { useEffect } from 'react';

import { Transaction } from '../../store/types.d';
import { useAppDispatch, useAppSelector } from '../../store';
import { getPortfolio } from '../../store/transactions';

const Home = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector((state) => state.transactions.list.map((id: number) => state.transactions[id]));
  const sessionUser = useAppSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getPortfolio());
  }, [dispatch, sessionUser]);

  return (
    <>
      {transactions.map((transaction: Transaction) => <p>{transaction.id}</p>)}
    </>
  );
};

export default Home;
