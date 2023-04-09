import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/MainScreen/Home';
import Auth from './screens/MainScreen/Auth';

const AuthStack = createNativeStackNavigator();

export const useRoute = isLoggedIn => {
  if (!isLoggedIn) {
    return <Auth />;
  }
  return <Home />;
};
