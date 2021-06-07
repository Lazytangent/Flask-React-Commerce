import { useAppSelector } from '../../store';

const QuoteData = () => {
  const quote = useAppSelector((state) => state.transactions.quote);

  return (
    <>
      <h3>{quote.name}</h3>
      <p>{quote.price}</p>
      <p>{quote.symbol}</p>
    </>
  );
};

export default QuoteData;
