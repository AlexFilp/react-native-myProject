import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { useCallback, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from './router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from './redux/store';
import { doAuthStateChange } from './redux/auth/operations';
import { auth } from './FireBase/config';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged(user => {
    console.log(user);
    setUser(user);
  });

  const routing = useRoute(user);

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
    <Provider store={store.store}>
      <NavigationContainer>
        <View
          style={{ flex: 1, backgroundColor: '#ffffff' }}
          onLayout={onLayoutRootView}
        >
          {routing}
        </View>
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   header: {
//     height: 88,
//     borderEndColor: '#BDBDBD',
//     borderBottomWidth: 1,
//   },
//   headerTitle: {
//     fontFamily: 'Roboto-Medium',
//     fontSize: 17,
//     lineHeight: 22,
//     letterSpacing: -0.408,
//     color: '#212121',
//   },
//   goBackBtn: {
//     paddingRight: 30,
//   },
// });

//  <MainStack.Navigator>
//    <MainStack.Screen
//      name="Auth"
//      component={Auth}
//      options={{
//        headerShown: false,
//      }}
//    />
//    <MainStack.Screen
//      name="Home"
//      component={Home}
//      options={{
//        headerShown: false,
//      }}
//    />
//    <MainStack.Screen
//      name="Создать публикацию"
//      component={CreatePostsScreen}
//      options={{
//        headerTitle: 'Создать публикацию',
//        headerStyle: styles.header,
//        headerTitleStyle: styles.headerTitle,
//        headerTitleAlign: 'center',
//      }}
//    />
//    <MainStack.Screen
//      name="Комментарии"
//      component={CommentsScreen}
//      options={{
//        headerStyle: styles.header,
//        headerTitleStyle: styles.headerTitle,
//        headerTitleAlign: 'center',
//      }}
//    />
//    <MainStack.Screen
//      name="Карта"
//      component={MapScreen}
//      options={{
//        headerStyle: styles.header,
//        headerTitleStyle: styles.headerTitle,
//        headerTitleAlign: 'center',
//      }}
//    />
//  </MainStack.Navigator>;

// headerLeft: () => (
//   <TouchableOpacity style={styles.goBackBtn} activeOpacity={0.8}>
//     <AntDesign
//       name="arrowleft"
//       size={24}
//       color="rgba(33, 33,33, 0.8)"
//     />
//   </TouchableOpacity>
// ),
