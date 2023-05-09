import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import store from './redux/store';
import Main from './components/Main';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
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
      <View
        style={{ flex: 1, backgroundColor: '#ffffff' }}
        onLayout={onLayoutRootView}
      >
        <Main />
      </View>
      <StatusBar style="auto" />
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
