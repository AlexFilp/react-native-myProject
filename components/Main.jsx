import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from '../router';
import { doAuthStateChange } from '../redux/auth/operations';

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(doAuthStateChange());
  }, []);

  const state = useSelector(({ auth }) => auth);
  console.log(state);
  console.log(state.stateChange);

  const routing = useRoute(state.stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
