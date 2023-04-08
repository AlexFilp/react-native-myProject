import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './screens/Auth/LoginScreen';
import RegistrationScreen from './screens/Auth/RegistrationScreen';
import PostsScreen from './screens/MainScreen/PostsScreen';
import CreatePostsScreen from './screens/MainScreen/CreatePostsScreen';
import ProfileScreen from './screens/MainScreen/ProfileScreen';

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

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
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <MainTab.Screen
        name="Posts"
        options={{
          headerTitle: 'Публикации',
          headerTitleAlign: 'center',
          tabBarIcon: ({ focused, size, color }) => {},
        }}
        component={PostsScreen}
      />
      <MainTab.Screen
        name="Create"
        options={{
          headerTitle: 'Создать публикацию',
          headerTitleAlign: 'center',
        }}
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        name="Profile"
        options={{
          headerShown: false,
        }}
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
