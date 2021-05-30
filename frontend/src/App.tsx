import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { authenticate } from './store/session';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </>
  );
};

export default App;
