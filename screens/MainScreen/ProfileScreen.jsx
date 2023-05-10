import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { doLogOut } from '../../redux/auth/operations';
// ICONS
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const ProfileScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([122121, 12312231]);
  const [likes, setLikes] = useState(5);

  const dispatch = useDispatch();
  const auth = useSelector(({ auth }) => auth);

  const { width, height } = useWindowDimensions();

  console.log('route.params', route.params);
  console.log(posts);

  useEffect(() => {
    if (route.params) {
      setPosts(prevState => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      {auth.isLoading && (
        <View
          style={{
            ...styles.loadingTextBox,
            width: width,
            height: height,
          }}
        >
          <Text style={styles.loadingText}>LOADING...</Text>
        </View>
      )}
      <ImageBackground
        source={require('../..//assets/images/mountainBg.jpg')}
        style={{
          ...styles.bgImage,
          width: width,
          height: height,
        }}
      >
        <View style={styles.listContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.logoutBtn}
            onPress={() => dispatch(doLogOut())}
          >
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <View style={styles.avatarThumb}>
            <Image
              style={styles.avatar}
              source={require('../../assets/images/defaultAvatar.jpg')}
            />
            <TouchableOpacity activeOpacity={0.8} style={styles.avatarBtn}>
              <AntDesign name="close" size={16} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
          <Text style={styles.listTitle}>{auth.user.login}</Text>
          <FlatList
            style={{ width: width }}
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
                <Image
                  style={styles.postImg}
                  source={{ uri: item.post.photo }}
                />
                <Text style={styles.postName}>{item.post.photoName}</Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Comments', {
                          image: item.post.photo,
                        })
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
                    <TouchableOpacity style={styles.likesContainer}>
                      <Feather
                        name="thumbs-up"
                        size={24}
                        color={likes > 0 ? '#FF6C00' : '#BDBDBD'}
                      />
                      <Text
                        style={{
                          ...styles.postLikes,
                          color: likes > 0 ? '#212121' : '#BDBDBD',
                        }}
                      >
                        {likes}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Map')}
                    style={styles.locationContainer}
                    activeOpacity={0.8}
                  >
                    <Feather name="map-pin" size={24} color="#BDBDBD" />
                    <Text style={styles.postLocationText}>
                      {item.post.photoLocation}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    // justifyContent: 'flex-end',
    paddingTop: 147,
  },
  listContainer: {
    flex: 1,
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
    paddingTop: 92,
  },
  logoutBtn: {
    position: 'absolute',
    top: 22,
    right: 16,
  },
  avatarThumb: {
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    position: 'absolute',
    top: -60,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  avatarBtn: {
    position: 'absolute',
    width: 24,
    height: 24,
    bottom: 14,
    right: -12,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    color: '##212121',
    marginBottom: 33,
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
    marginRight: 24,
  },
  likesContainer: {
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
    marginLeft: 6,
  },
  postLikes: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 6,
  },
  loadingTextBox: {
    position: 'absolute',
    backgroundColor: '#BDBDBD',
    zIndex: 1100,
    fontSize: 40,
    opacity: 0.3,
    paddingTop: 300,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 40,
    color: '#212121',
  },
});

export default ProfileScreen;
