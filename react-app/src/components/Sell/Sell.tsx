import { useState } from 'react';

import { useAppDispatch } from '../../store';
import { sellStock } from '../../store/transactions';

const Sell = () => {
  const dispatch = useAppDispatch();

  const [symbol_, setSymbol_] = useState('');
  const [shares, setShares] = useState(0);

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(sellStock({ symbol: symbol_, shares }));
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={symbol_}
          onChange={(e) => setSymbol_(e.target.value)}
          placeholder="Symbol"
        />
        <input
          type="number"
          value={shares}
          onChange={(e) => setShares(parseInt(e.target.value))}
          placeholder="Shares"
        />
        <button type="submit">Sell Stock</button>
      </form>
    </>
  );
};

export default Sell;
