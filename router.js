import Home from './screens/MainScreen/Home';
import Auth from './screens/MainScreen/Auth';

export const useRoute = isLoggedIn => {
  if (!isLoggedIn) {
    return <Auth />;
  }
  return <Home />;
};
