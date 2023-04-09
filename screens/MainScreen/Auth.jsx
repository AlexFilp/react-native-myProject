import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../Auth/LoginScreen';
import RegistrationScreen from '../Auth/RegistrationScreen';

const AuthStack = createNativeStackNavigator();

const Auth = () => {
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
};

export default Auth;
