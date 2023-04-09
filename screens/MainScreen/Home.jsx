import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button } from 'react-native';
// ICONS
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';

const MainTab = createBottomTabNavigator();

const Home = () => {
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
          paddingTop: 9,
          paddingHorizontal: 80,
        },
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerTitle: 'Публикации',
          headerTitleStyle: {
            fontFamily: 'Roboto-Medium',
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: -0.408,
            color: '#212121',
          },
          headerTitleAlign: 'center',
          headerRight: () => (
            <MaterialIcons
              name="logout"
              size={24}
              color="#BDBDBD"
              onPress={() => console.log('PRESS')}
              style={{ marginRight: 16 }}
            />
          ),
          headerTintColor: '#FFFFFF',
          tabBarItemStyle: {
            borderRadius: 20,
            height: 40,
          },
          tabBarIcon: ({ focused, size, color }) => (
            <SimpleLineIcons name="grid" size={24} color={color} />
          ),
          tabBarInactiveTintColor: '#212121',
          tabBarActiveBackgroundColor: '#ff6c00',
          tabBarActiveTintColor: '#ffffff',
        }}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          headerTitle: 'Создать публикацию',
          headerTitleStyle: {
            fontFamily: 'Roboto-Medium',
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: -0.408,
            color: '#212121',
          },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              color="rgba(33, 33, 33, 0.8)"
              onPress={() => console.log('PRESS')}
              style={{ marginLeft: 16 }}
            />
          ),

          tabBarItemStyle: {
            borderRadius: 20,
            height: 40,
          },
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="plus" size={24} color={color} />
          ),
          tabBarInactiveTintColor: '#212121',
          tabBarActiveBackgroundColor: '#ff6c00',
          tabBarActiveTintColor: '#ffffff',
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            borderRadius: 20,
            height: 40,
          },
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color={color} />
          ),
          tabBarInactiveTintColor: '#212121',
          tabBarActiveBackgroundColor: '#ff6c00',
          tabBarActiveTintColor: '#ffffff',
        }}
      />
    </MainTab.Navigator>
  );
};

export default Home;
