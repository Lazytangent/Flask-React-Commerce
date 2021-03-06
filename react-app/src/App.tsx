import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { useAppDispatch } from './store';
import { authenticate } from './store/session';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Quote from './components/Quote';
import Buy from './components/Buy';
import Sell from './components/Sell';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/quote">
          <Quote />
        </Route>
        <Route path="/buy">
          <Buy />
        </Route>
        <Route path="/sell">
          <Sell />
        </Route>
        <Route path="/history">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </>
  );
};

export default App;
