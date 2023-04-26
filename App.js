import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from './router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// ICONS
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const MainStack = createNativeStackNavigator();

import Auth from './screens/MainScreen/Auth';
import Home from './screens/MainScreen/Home';
import CommentsScreen from './screens/NestedScreens/CommentsScreen';
import MapScreen from './screens/NestedScreens/MapScreen';
import CreatePostsScreen from './screens/MainScreen/CreatePostsScreen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const routing = useRoute({});

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
          <MainStack.Screen
            name="Создать публикацию"
            component={CreatePostsScreen}
            options={{
              headerTitle: 'Создать публикацию',
              headerStyle: styles.header,
              headerTitleStyle: styles.headerTitle,
              headerTitleAlign: 'center',
            }}
          />
          <MainStack.Screen
            name="Комментарии"
            component={CommentsScreen}
            options={{
              headerStyle: styles.header,
              headerTitleStyle: styles.headerTitle,
              headerTitleAlign: 'center',
            }}
          />
          <MainStack.Screen
            name="Карта"
            component={MapScreen}
            options={{
              headerStyle: styles.header,
              headerTitleStyle: styles.headerTitle,
              headerTitleAlign: 'center',
            }}
          />
        </MainStack.Navigator> */}
        {routing}
      </View>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

// headerLeft: () => (
//   <TouchableOpacity style={styles.goBackBtn} activeOpacity={0.8}>
//     <AntDesign
//       name="arrowleft"
//       size={24}
//       color="rgba(33, 33,33, 0.8)"
//     />
//   </TouchableOpacity>
// ),

const styles = StyleSheet.create({
  header: {
    height: 88,
    borderEndColor: '#BDBDBD',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: '#212121',
  },
  goBackBtn: {
    paddingRight: 30,
  },
});
