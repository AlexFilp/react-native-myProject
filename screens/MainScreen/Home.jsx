import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeStack = createNativeStackNavigator();

import HomeTab from './HomeTab';
import CreatePostsScreen from './CreatePostsScreen';
import CommentsScreen from '../NestedScreens/CommentsScreen';
import MapScreen from '../NestedScreens/MapScreen';

const Home = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Создать публикацию"
        component={CreatePostsScreen}
        options={{
          headerTitle: 'Создать публикацию',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
        }}
      />
      <HomeStack.Screen
        name="Комментарии"
        component={CommentsScreen}
        options={{
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
        }}
      />
      <HomeStack.Screen
        name="Карта"
        component={MapScreen}
        options={{
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
        }}
      />
    </HomeStack.Navigator>
  );
};

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

export default Home;
