import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity } from 'react-native';
// ICONS
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';

const MainTab = createBottomTabNavigator();

const Home = ({ navigation }) => {
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
        name="Posts"
        component={PostsScreen}
        options={{
          headerTitle: 'Публикации',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.logoutBtn}
              onPress={() => navigation.navigate('Auth')}
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
        name="Create"
        component={CreatePostsScreen}
        options={{
          headerTitle: 'Создать публикацию',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.goBackBtn}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Posts')}
            >
              <AntDesign
                name="arrowleft"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            </TouchableOpacity>
          ),

          tabBarButton: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.plusBtn}
              onPress={() => {
                navigation.navigate('Create');
              }}
            >
              <AntDesign name="plus" size={24} color="#ffffff" />
            </TouchableOpacity>
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
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

export default Home;

const styles = StyleSheet.create({
  tabBar: {
    height: 83,
    paddingTop: 9,
    borderTopWidth: 1,
    borderColor: '#BDBDBD',
    paddingHorizontal: 62,
  },
  header: {
    height: 88,
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
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6C00',
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
