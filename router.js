import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/MainScreen/Home';
import LoginScreen from './screens/Auth/LoginScreen';
import RegistrationScreen from './screens/Auth/RegistrationScreen';

const AuthStack = createNativeStackNavigator();

export const useRoute = isLoggedIn => {
  if (!isLoggedIn) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}
          component={LoginScreen}
        />
        <AuthStack.Screen
          name="Registration"
          options={{
            headerShown: false,
          }}
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return <Home />;
};
