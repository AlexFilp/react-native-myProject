import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  useWindowDimensions,
  Platform,
  Keyboard,
} from 'react-native';
import { useState } from 'react';
// ICONS
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const CreatePostsScreen = () => {
  const [isKeybordHidden, setIsKeybordHidden] = useState(true);
  const [isName, setIsName] = useState(false);
  const [isLocation, setIsLocation] = useState(false);

  const { width, height } = useWindowDimensions();

  const onKeyboardClose = () => {
    setIsKeybordHidden(true);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={onKeyboardClose}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' && 'padding'}>
          <View
            style={{
              width: width - 16 * 2,
              paddingBottom: isKeybordHidden ? 120 : 100,
            }}
          >
            <View style={styles.photoContainer}>
              <ImageBackground></ImageBackground>
              <TouchableOpacity activeOpacity={0.5} style={styles.photoBtn}>
                <FontAwesome name="camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
            <Text style={styles.photoText}>Загрузите фото</Text>
            <TextInput
              style={{
                ...styles.input,
                borderColor: isName ? '#FF6C00' : '#E8E8E8',
              }}
              placeholder="Название"
              placeholderTextColor="#BDBDBD"
              onFocus={() => {
                setIsKeybordHidden(false);
                setIsName(true);
              }}
              onBlur={() => setIsName(false)}
              onSubmitEditing={() => setIsKeybordHidden(true)}
            />
            <View style={{ marginTop: 16 }}>
              <TextInput
                style={{
                  ...styles.input,
                  paddingLeft: 28,
                  borderColor: isLocation ? '#FF6C00' : '#E8E8E8',
                }}
                placeholder="Местность..."
                placeholderTextColor="#BDBDBD"
                onFocus={() => {
                  setIsKeybordHidden(false);
                  setIsLocation(true);
                }}
                onBlur={() => setIsLocation(false)}
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
            {isKeybordHidden && (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  ...styles.postBtn,
                }}
              >
                <Text style={styles.PostBtnText}>Опубликовать</Text>
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity activeOpacity={0.8} style={styles.deleteBtn}>
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
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
  photoContainer: {
    height: 267,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginBottom: 8,
  },
  photoBtn: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: '#F6F6F6',
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 32,
  },
  PostBtnText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
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
