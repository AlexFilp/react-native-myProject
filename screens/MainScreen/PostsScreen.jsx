import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
// ICONS
import { MaterialIcons } from '@expo/vector-icons';

import DefaultScreenPost from '../NestedScreens/DefaultScreenPosts';
import CommentsScreen from '../NestedScreens/CommentsScreen';
import MapScreen from '../NestedScreens/MapScreen';

const NestedStack = createNativeStackNavigator();

const PostsScreen = ({ navigation }) => {
  return (
    <NestedStack.Navigator>
      <NestedStack.Screen
        name="Публикации"
        component={DefaultScreenPost}
        options={{
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
        }}
      />
      <NestedStack.Screen name="Комментарии" component={CommentsScreen} />
      <NestedStack.Screen name="Карта" component={MapScreen} />
    </NestedStack.Navigator>
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
  logoutBtn: {
    paddingLeft: 30,
  },
  goBackBtn: {
    paddingLeft: 16,
    paddingRight: 30,
  },
});

export default PostsScreen;
