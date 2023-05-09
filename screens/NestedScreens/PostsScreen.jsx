import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';

// ICONS
import { Feather } from '@expo/vector-icons';

const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const { width, height } = useWindowDimensions();

  console.log('route.params', route.params);
  console.log(posts);
  // const { photo, photoName, photoLocation } = route.params.post;
  // console.log('photo', photo);
  // console.log('photoName', photoName);
  // console.log('photoLocation', photoLocation);

  useEffect(() => {
    if (route.params) {
      setPosts(prevState => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: width - 16 * 2,
          alignSelf: 'center',
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
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              width: width - 16 * 2,
              alignSelf: 'center',
              marginBottom: 32,
            }}
          >
            <Image style={styles.postImg} source={{ uri: item.post.photo }} />
            <Text style={styles.postName}>
              {item.post.photoName === ''
                ? 'Нет названия'
                : item.post.photoName}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Комментарии', { image: item.post.photo })
                }
                style={styles.commentsContainer}
                activeOpacity={0.8}
              >
                <Feather
                  style={{ top: 2 }}
                  name="message-circle"
                  size={24}
                  color={comments.length === 0 ? '#BDBDBD' : '#FF6C00'}
                />
                <Text
                  style={{
                    ...styles.postComments,
                    color: comments.length === 0 ? '#BDBDBD' : '#212121',
                  }}
                >
                  {comments.length}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Карта', {
                    title: item.post.photoName,
                    locationName: item.post.photoLocationName,
                    coords: item.post.photoLocationCoords,
                  })
                }
                style={styles.locationContainer}
                activeOpacity={0.8}
              >
                <Feather name="map-pin" size={24} color="#BDBDBD" />
                <Text style={styles.postLocationText}>
                  {item.post.photoLocationName === ''
                    ? 'Локация'
                    : item.post.photoLocationName}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
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

    marginBottom: 32,
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
  postImg: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  postName: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    marginBottom: 8,
  },
  commentsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  postLocationText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    textDecorationLine: 'underline',
    marginLeft: 4,
  },
  postComments: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 9,
  },
});

export default PostsScreen;
