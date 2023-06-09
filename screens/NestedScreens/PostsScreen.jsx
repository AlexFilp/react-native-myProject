import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { db } from '../../FireBase/config';
import { collection, getDocs } from 'firebase/firestore';
// ICONS
import { Feather } from '@expo/vector-icons';
// ICONS

const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const { width, height } = useWindowDimensions();

  const auth = useSelector(({ auth }) => auth);

  // const getDataFromFirestore = async () => {
  //   try {
  //     const snapshot = await getDocs(collection(db, 'posts'));
  //     // Перевіряємо у консолі отримані дані
  //     snapshot.forEach(doc => console.log(`${doc.id} =>`, doc.data()));
  //     // Повертаємо масив обʼєктів у довільній формі
  //     return snapshot.map(doc => ({ id: doc.id, data: doc.data() }));
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // };

  console.log('POSTS IN POSTSCREEN', posts);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const getAllPosts = async () => {
        try {
          const snapshot = await getDocs(collection(db, 'posts'));

          const allPosts = [];

          snapshot.forEach(doc => {
            // console.log(`${doc.id} ===>`, doc.data());
            allPosts.push({ id: doc.id, data: doc.data() });
          });

          console.log('allPosts ===>', allPosts);

          if (isActive) {
            setPosts(allPosts);
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      };

      getAllPosts();

      return () => {
        isActive = false;
      };
    }, [])
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
      <View
        style={{
          width: width - 16 * 2,
          alignSelf: 'center',
        }}
      >
        <View style={styles.accContainer}>
          <Image
            style={styles.avatar}
            source={require('../../assets/images/defaultAvatar.jpg')}
          ></Image>

          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.name}>{auth.user.login}</Text>
            <Text style={styles.email}>{auth.user.email}</Text>
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
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Комментарии', {
                    image: item.data.uploadedPhoto,
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
                    item.data.photoComments.length === 0 ? '#BDBDBD' : '#FF6C00'
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
                onPress={() =>
                  navigation.navigate('Карта', {
                    title: item.data.photoName,
                    locationName: item.data.photoLocationName,
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

export default PostsScreen;
