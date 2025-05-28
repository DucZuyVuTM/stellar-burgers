import AppRouter from '../../router';

import '../../index.css';
import styles from './app.module.css';
import { AppHeader } from '@components';
import { useDispatch } from '@store';
import { getIngredients, getUser } from '@slices';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <AppRouter />
    </div>
  );
};

export default App;
