import { useState } from 'react';

import styles from './Quote.module.css';
import { useAppDispatch, useAppSelector } from '../../store';
import { getQuote } from '../../store/transactions';
import QuoteData from './QuoteData';

const Quote = () => {
  const dispatch = useAppDispatch();
  const quote = useAppSelector((state) => state.transactions.quote);

  const [symbol_, setSymbol_] = useState('');

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(getQuote(symbol_));
  };

  return (
    <>
      <form onSubmit={submitHandler} className={styles.form}>
        <input
          type="text"
          placeholder="Symbol"
          value={symbol_}
          onChange={(e) => setSymbol_(e.target.value)}
        />
        <button type="submit">Get Quote</button>
      </form>
      {quote && (
        <QuoteData />
      )}
    </>
  );
};

export default Quote;
