import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
// ICONS
import { AntDesign } from '@expo/vector-icons';

const CommentsScreen = ({ navigation, route }) => {
  const [comments, setComments] = useState([]);
  const [image, setImage] = useState(null);
  const [isComment, setIsComment] = useState(false);
  const [comment, setComment] = useState('');
  const [isKeybordHidden, setIsKeybordHidden] = useState(true);
  console.log(route.params);

  const { width, height } = useWindowDimensions();

  const onKeyboardClose = () => {
    setIsKeybordHidden(true);
    Keyboard.dismiss();
  };

  const addComment = () => {
    if (comment === '') {
      return;
    }
    setComments(prevState => [...prevState, comment]);
    setComment('');
  };

  useEffect(() => {
    if (route.params) {
      setImage(route.params.image);
    }
  }, [route.params]);
  return (
    <TouchableWithoutFeedback onPress={onKeyboardClose}>
      <View style={{ ...styles.container, width: width, height: height }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' && 'padding'}>
          <View
            style={{
              width: width - 16 * 2,
              paddingTop: 32,
              paddingBottom: isKeybordHidden ? 30 : 100,
            }}
          >
            <Image style={styles.image} source={{ uri: image }}></Image>
            <View>
              <FlatList
                style={{ marginBottom: 31, height: 323 }}
                data={comments}
                keyExtractor={(item, indx) => indx.toString()}
                renderItem={({ item }) => (
                  <View style={styles.commentContainer}>
                    <Text>{item}</Text>
                  </View>
                )}
              />
              <View>
                <TextInput
                  value={comment}
                  placeholder="Коментировать..."
                  placeholderTextColor="#BDBDBD"
                  onFocus={() => {
                    setIsComment(true);
                    setIsKeybordHidden(false);
                  }}
                  onBlur={() => setIsComment(false)}
                  onChangeText={text => {
                    setComment(text);
                  }}
                  onSubmitEditing={() => setIsKeybordHidden(true)}
                  style={{
                    ...styles.input,
                    borderColor: isComment ? '#FF6C00' : '#E8E8E8',
                  }}
                />
                <TouchableOpacity
                  onPress={addComment}
                  activeOpacity={0.8}
                  style={{
                    ...styles.sendBtn,
                    backgroundColor: comment === '' ? '#F6F6F6' : '#FF6C00',
                  }}
                >
                  <AntDesign
                    name="arrowup"
                    size={24}
                    color={comment === '' ? '#BDBDBD' : '#FFFFFF'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
  image: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 100,
    paddingLeft: 16,
    paddingRight: 50,
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    fontFamily: 'Roboto-Medium',
  },
  sendBtn: {
    position: 'absolute',
    height: 34,
    width: 34,
    top: 8,
    right: 8,
    backgroundColor: '#FF6C00',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 35,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    marginBottom: 24,
  },
});

export default CommentsScreen;
