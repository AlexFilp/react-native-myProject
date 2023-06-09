import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  useWindowDimensions,
  Platform,
  Keyboard,
} from 'react-native';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { db, storage } from '../../FireBase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

// ICONS
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const initialState = {
  photo: '',
  photoName: '',
  photoLocationName: '',
  photoLocationCoords: {},
  photoComments: [],
  likes: {
    likesNumber: 0,
    liked: false,
  },
};

const CreatePostsScreen = ({ navigation }) => {
  const [post, setPost] = useState(initialState);
  const [isKeybordHidden, setIsKeybordHidden] = useState(true);
  const [isName, setIsName] = useState(false);
  const [isLocation, setIsLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // CAMERA
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState('');
  // const [hasPermissionCamera, setHasPermissionCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  // CAMERA

  const { width, height } = useWindowDimensions();

  const { userId, login } = useSelector(state => state.auth.user);

  useEffect(() => {
    (async () => {
      const { statusCamera } = await Camera.requestCameraPermissionsAsync();
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }
      await MediaLibrary.requestPermissionsAsync();

      // setHasPermissionCamera(status === 'granted');
    })();
  }, []);

  const onKeyboardClose = () => {
    setIsKeybordHidden(true);
    Keyboard.dismiss();
  };

  const takePhoto = async () => {
    if (photo !== '') {
      setPost(prevState => ({ ...prevState, photo: '' }));
      setPhoto('');
    } else if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      const location = await Location.getCurrentPositionAsync();
      setPost(prevState => ({
        ...prevState,
        photoLocationCoords: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      }));
      await MediaLibrary.requestPermissionsAsync(uri);
      setPhoto(uri);
      setPost(prevState => ({ ...prevState, photo: uri }));
    }
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const postId = nanoid();
    const storageRef = ref(storage, `postImage/${postId}`);
    await uploadBytes(storageRef, file);

    const uploadedPhoto = await getDownloadURL(storageRef);

    console.log('uploadedPhoto', uploadedPhoto);

    return uploadedPhoto;
  };

  const uploadPostToServer = async () => {
    setIsLoading(true);
    try {
      const uploadedPhoto = await uploadPhotoToServer();

      const docRef = await addDoc(collection(db, 'posts'), {
        ...post,
        uploadedPhoto,
        userId,
        login,
      });
      console.log('Document written with ID: ', docRef.id);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error adding document: ', error);
      throw error;
    }
  };

  const onSubmit = async () => {
    console.log('post ==>', post);
    await uploadPostToServer();
    navigation.navigate('Публикации');
  };

  // if (cameraRef) {
  //   if (photo) {
  //     cameraRef.pausePreview();
  //   } else if (photo === '') {
  //     cameraRef.resumePreview();
  //   }
  // }

  // if (hasPermission === null) {
  //   return <Text>hasPermission === null</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>hasPermission === false</Text>;
  // }

  return (
    <TouchableWithoutFeedback onPress={onKeyboardClose}>
      <View style={{ ...styles.container, width: width, height: height }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' && 'padding'}>
          <View
            style={{
              width: width - 16 * 2,
              paddingBottom: isKeybordHidden ? 194 : 20,
            }}
          >
            <Camera
              style={styles.camera}
              type={type}
              ref={ref => {
                setCameraRef(ref);
              }}
            >
              {photo && (
                <Image source={{ uri: photo }} style={styles.takedPhoto} />
              )}
              <TouchableOpacity
                onPress={takePhoto}
                activeOpacity={0.5}
                style={styles.photoBtn}
              >
                <FontAwesome name="camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
              {photo === '' && (
                <TouchableOpacity
                  // disabled={photo === '' ? false : true}
                  activeOpacity={0.5}
                  style={styles.flipBtn}
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                >
                  <MaterialIcons
                    name="flip-camera-android"
                    size={24}
                    color="#BDBDBD"
                  />
                </TouchableOpacity>
              )}
            </Camera>
            <Text style={styles.photoText}>
              {photo === '' ? 'Загрузите фото' : 'Редактируйте фото'}
            </Text>
            <TextInput
              style={{
                ...styles.input,
                borderColor: isName ? '#FF6C00' : '#E8E8E8',
              }}
              value={post.photoName}
              placeholder="Название"
              placeholderTextColor="#BDBDBD"
              onFocus={() => {
                setIsKeybordHidden(false);
                setIsName(true);
              }}
              onBlur={() => setIsName(false)}
              onChangeText={text =>
                setPost(prevState => ({ ...prevState, photoName: text }))
              }
              onSubmitEditing={() => setIsKeybordHidden(true)}
            />
            <View style={{ marginTop: 16 }}>
              <TextInput
                style={{
                  ...styles.input,
                  paddingLeft: 28,
                  borderColor: isLocation ? '#FF6C00' : '#E8E8E8',
                }}
                value={post.photoLocationName}
                placeholder="Местность..."
                placeholderTextColor="#BDBDBD"
                onFocus={() => {
                  setIsKeybordHidden(false);
                  setIsLocation(true);
                }}
                onBlur={() => setIsLocation(false)}
                onChangeText={text =>
                  setPost(prevState => ({
                    ...prevState,
                    photoLocationName: text,
                  }))
                }
                onSubmitEditing={() => setIsKeybordHidden(true)}
              />
              <View style={styles.mapPin}>
                <Feather
                  name="map-pin"
                  size={24}
                  color={isLocation ? '#FF6C00' : '#E8E8E8'}
                />
              </View>
            </View>

            <TouchableOpacity
              disabled={post.photo === '' ? true : false}
              onPress={onSubmit}
              activeOpacity={0.8}
              style={{
                ...styles.postBtn,
                backgroundColor:
                  post.photo === '' || isLoading ? '#F6F6F6' : '#FF6C00',
              }}
            >
              <Text
                style={{
                  ...styles.PostBtnText,
                  color: post.photo === '' || isLoading ? '#BDBDBD' : '#ffffff',
                }}
              >
                {isLoading ? 'Публикуем' : 'Опубликовать'}
              </Text>
            </TouchableOpacity>
          </View>
          {isKeybordHidden && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                ...styles.deleteBtn,
                backgroundColor:
                  post.photoName === '' &&
                  post.photoLocationName === '' &&
                  post.photo === ''
                    ? '#F6F6F6'
                    : '#FF6C00',
              }}
              onPress={() => {
                setPost(initialState);
                setPhoto('');
              }}
            >
              <Feather
                name="trash-2"
                size={24}
                color={
                  post.photoName === '' &&
                  post.photoLocationName === '' &&
                  post.photo === ''
                    ? '#BDBDBD'
                    : '#ffffff'
                }
              />
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  camera: {
    height: 240,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginBottom: 8,
    overflow: 'hidden',
  },
  takedPhoto: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  photoBtn: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  flipBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  photoText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
    marginBottom: 32,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  mapPin: {
    position: 'absolute',
    top: 13,
  },
  postBtn: {
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 32,
  },
  PostBtnText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
  },
  deleteBtn: {
    width: 70,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#F6F6F6',
    position: 'absolute',
    bottom: 34,
  },
});

export default CreatePostsScreen;
