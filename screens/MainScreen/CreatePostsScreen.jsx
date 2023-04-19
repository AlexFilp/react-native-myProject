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
import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
// ICONS
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const initialState = {
  photo: '',
  photoName: '',
  photoLocation: '',
};

const CreatePostsScreen = ({ navigation }) => {
  const [post, setPost] = useState(initialState);
  const [location, setLocation] = useState(null);
  // CAMERA
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState('');
  // const [hasPermissionCamera, setHasPermissionCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  // CAMERA
  const [isKeybordHidden, setIsKeybordHidden] = useState(true);
  const [isName, setIsName] = useState(false);
  const [isLocation, setIsLocation] = useState(false);

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    (async () => {
      const { statusCamera } = await Camera.requestCameraPermissionsAsync();
      let { statusLocation } =
        await Location.requestForegroundPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      // setHasPermissionCamera(status === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      const location = await Location.getCurrentPositionAsync();
      console.log('latitude', location.coords.latitude);
      console.log('longitude', location.coords.longitude);

      await MediaLibrary.requestPermissionsAsync(uri);
      console.log('uri ======>', uri);
      setPhoto(uri);
      console.log('photo ======>', photo);
      setPost(prevState => ({ ...prevState, photo: uri }));
    }
  };

  const onKeyboardClose = () => {
    setIsKeybordHidden(true);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    console.log(post);
    setPost(initialState);
    setPhoto('');
    console.log(navigation);
    navigation.navigate('Posts', { post });
  };

  // if (photo) {
  //   cameraRef.pausePreview();
  // } else {
  //   cameraRef.resumePreview();
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
                <Image
                  source={{ uri: photo }}
                  style={styles.takedPhoto}
                ></Image>
              )}
              <TouchableOpacity
                disabled={photo === '' ? false : true}
                onPress={takePhoto}
                activeOpacity={0.5}
                style={styles.photoBtn}
              >
                <FontAwesome name="camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
              <TouchableOpacity
                disabled={photo === '' ? false : true}
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
            </Camera>
            <Text style={styles.photoText}>Загрузите фото</Text>
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
                value={post.photoLocation}
                placeholder="Местность..."
                placeholderTextColor="#BDBDBD"
                onFocus={() => {
                  setIsKeybordHidden(false);
                  setIsLocation(true);
                }}
                onBlur={() => setIsLocation(false)}
                onChangeText={text =>
                  setPost(prevState => ({ ...prevState, photoLocation: text }))
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
              disabled={
                post.photoName === '' ||
                post.photoLocation === '' ||
                post.photo === ''
                  ? true
                  : false
              }
              onPress={onSubmit}
              activeOpacity={0.8}
              style={{
                ...styles.postBtn,
                backgroundColor:
                  post.photoName === '' ||
                  post.photoLocation === '' ||
                  post.photo === ''
                    ? '#F6F6F6'
                    : '#FF6C00',
              }}
            >
              <Text
                style={{
                  ...styles.PostBtnText,
                  color:
                    post.photoName === '' ||
                    post.photoLocation === '' ||
                    post.photo === ''
                      ? '#BDBDBD'
                      : '#ffffff',
                }}
              >
                Опубликовать
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
                  post.photoLocation === '' &&
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
                  post.photoLocation === '' &&
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
    zIndex: 100,
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
