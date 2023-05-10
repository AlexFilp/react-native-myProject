import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../../FireBase/config';
import { useDispatch } from 'react-redux';
import { doLogOut } from '../../redux/auth/operations';
// ICONS
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
// ICONS
import PostsScreen from '../NestedScreens/PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';

const MainTab = createBottomTabNavigator();

const HomeTab = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarInactiveTintColor: 'rgba(33, 33, 33, 0.8)',
        tabBarActiveTintColor: '#ff6c00',
      }}
    >
      <MainTab.Screen
        name="Публикации"
        component={PostsScreen}
        options={{
          // headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.logoutBtn}
              onPress={() => dispatch(doLogOut())}
            >
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerTintColor: '#FFFFFF',
          tabBarIcon: ({ focused, size, color }) => (
            <SimpleLineIcons name="grid" size={24} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Создать публикацию"
        component={CreatePostsScreen}
        options={{
          tabBarButton: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.plusBtn}
              onPress={() => {
                navigation.navigate('Создать публикацию');
              }}
            >
              <AntDesign name="plus" size={24} color="#ffffff" />
            </TouchableOpacity>
          ),
        }}
      />
      <MainTab.Screen
        name="Профиль"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={27} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 83,
    paddingTop: 9,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderColor: '#BDBDBD',
    paddingHorizontal: 81,
  },
  header: {
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: '#212121',
  },
  plusBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6C00',
    width: 70,
    marginHorizontal: 20,
  },
  logoutBtn: {
    paddingLeft: 30,
    paddingRight: 16,
  },
  goBackBtn: {
    paddingLeft: 16,
    paddingRight: 30,
  },
});
export default HomeTab;

// headerTitle: 'Создать публикацию',
// headerStyle: styles.header,
// headerTitleStyle: styles.headerTitle,
// headerTitleAlign: 'center',
// headerLeft: () => (
//   <TouchableOpacity
//     style={styles.goBackBtn}
//     activeOpacity={0.8}
//     onPress={() => navigation.navigate('Posts')}
//   >
//     <AntDesign
//       name="arrowleft"
//       size={24}
//       color="rgba(33, 33,33, 0.8)"
//     />
//   </TouchableOpacity>
// ),
// tabBarIcon: ({ focused, size, color }) => (
//   <AntDesign
//     // onPress={() => navigation.navigate('Создать публикацию')}
//     name="plus"
//     size={24}
//     color="#ffffff"
//   />
// ),
// tabBarItemStyle: styles.plusBtn,
