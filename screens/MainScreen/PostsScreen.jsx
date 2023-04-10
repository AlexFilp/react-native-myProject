import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
} from 'react-native';

const PostsScreen = () => {
  const { width, height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View
        style={{
          width: width - 16 * 2,
        }}
      >
        <View style={styles.accContainer}>
          <Image
            style={styles.avatar}
            source={require('../../assets/images/avatar.jpg')}
          ></Image>

          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.name}>Natali Romanova</Text>
            <Text style={styles.email}>email@example.com</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 16,
  },
  accContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  name: {
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
    lineHeight: 15,
    color: '#212121',
  },
  email: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    lineHeight: 13,
    color: '#rgba(33, 33, 33, 0.8)',
  },
});

export default PostsScreen;
