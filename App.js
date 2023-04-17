import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from './router';
import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MainStack = createNativeStackNavigator();

import Auth from './screens/MainScreen/Auth';
import Home from './screens/MainScreen/Home';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const routing = useRoute({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/Fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/Fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/Fonts/Roboto-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <View
        style={{ flex: 1, backgroundColor: '#ffffff' }}
        onLayout={onLayoutRootView}
      >
        {/* <MainStack.Navigator>
          <MainStack.Screen
            name="Auth"
            component={Auth}
            options={{
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
        </MainStack.Navigator> */}
        {/* {!isLoggedIn ? <Auth /> : <Home />} */}
        {routing}
      </View>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
