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
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';
import { db } from '../../FireBase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { doLogOut } from '../../redux/auth/operations';
import { getAllPosts } from '../../redux/dashboard/operations';
import { selectAllPosts } from '../../redux/dashboard/selectors';
// ICONS
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const [doUpdate, setDoUpdate] = useState(0);

  const dispatch = useDispatch();

  const auth = useSelector(({ auth }) => auth);
  const myPosts = useSelector(selectAllPosts).filter(
    item => item.data.userId === auth.user.userId
  );

  const { width, height } = useWindowDimensions();

  const doLike = async (postId, likes) => {
    const post = myPosts.find(item => item.id === postId);
    try {
      const ref = doc(db, 'posts', postId);
      if (likes.liked) {
        await updateDoc(ref, {
          likes: {
            likesNumber: post.data.likes.likesNumber - 1,
            liked: false,
          },
        });
      } else if (!likes.liked) {
        await updateDoc(ref, {
          likes: {
            likesNumber: post.data.likes.likesNumber + 1,
            liked: true,
          },
        });
      }

      setDoUpdate(prevState => (prevState += 1));
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      if (isActive) {
        dispatch(getAllPosts());
      }

      return () => {
        isActive = false;
      };
    }, [doUpdate])
  );

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
          <Text style={styles.loadingText}>LOADING</Text>
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
            data={myPosts}
            keyExtractor={item => item.id}
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
                  source={{ uri: item.data.uploadedPhoto }}
                />
                <Text style={styles.postName}>
                  {item.data.photoName === ''
                    ? 'Нет названия'
                    : item.data.photoName}
                </Text>
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
                        navigation.navigate('Комментарии', {
                          postImage: item.data.uploadedPhoto,
                          postId: item.id,
                        })
                      }
                      style={styles.commentsContainer}
                      activeOpacity={0.8}
                    >
                      <Feather
                        style={{ top: 2 }}
                        name="message-circle"
                        size={24}
                        color={
                          item.data.photoComments.length === 0
                            ? '#BDBDBD'
                            : '#FF6C00'
                        }
                      />
                      <Text
                        style={{
                          ...styles.postComments,
                          color:
                            item.data.photoComments.length === 0
                              ? '#BDBDBD'
                              : '#212121',
                        }}
                      >
                        {item.data.photoComments.length}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => doLike(item.id, item.data.likes)}
                      style={styles.likesContainer}
                    >
                      <Feather
                        name="thumbs-up"
                        size={24}
                        color={
                          item.data.likes.likesNumber > 0
                            ? '#FF6C00'
                            : '#BDBDBD'
                        }
                      />
                      <Text
                        style={{
                          ...styles.postLikes,
                          color:
                            item.data.likes.likesNumber > 0
                              ? '#212121'
                              : '#BDBDBD',
                        }}
                      >
                        {item.data.likes.likesNumber}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Карта', {
                        title: item.data.photoName,
                        coords: item.data.photoLocationCoords,
                      })
                    }
                    style={styles.locationContainer}
                    activeOpacity={0.8}
                  >
                    <Feather name="map-pin" size={24} color="#BDBDBD" />
                    <Text style={styles.postLocationText}>
                      {item.data.photoLocationName === ''
                        ? 'Локация'
                        : item.data.photoLocationName}
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingTop: 300,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 40,
    color: '#212121',
  },
});

export default ProfileScreen;
