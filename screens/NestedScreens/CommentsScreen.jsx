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
import moment from 'moment';
// ICONS
import { AntDesign } from '@expo/vector-icons';

const CommentsScreen = ({ navigation, route }) => {
  const [comments, setComments] = useState([
    'Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!',
    'A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.',
    'Thank you! That was very helpful!',
  ]);
  const [image, setImage] = useState(null);
  const [isComment, setIsComment] = useState(false);
  const [comment, setComment] = useState('');
  const [isKeybordHidden, setIsKeybordHidden] = useState(true);

  const { width, height } = useWindowDimensions();

  const getDate = () => {
    let date = moment().format('LL');
    return date;
  };

  const getTime = () => {
    let time = moment().format('LT');
    return time;
  };

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
                style={{
                  marginBottom: 31,
                  height: 323,
                }}
                data={comments}
                keyExtractor={(item, indx) => indx.toString()}
                renderItem={({ item }) => (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <View style={styles.commentContainer}>
                      <Text style={styles.commentText}>{item}</Text>
                      <Text style={styles.commentTimeText}>
                        {getDate()} | {getTime()}
                      </Text>
                    </View>
                    <Image
                      style={styles.profileImage}
                      source={require('../../assets/images/avatar.jpg')}
                    />
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
  profileImage: {
    width: 28,
    height: 28,
    borderRadius: 50,
    marginLeft: 16,
  },
  input: {
    minHeight: 50,
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
    width: 299,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    marginBottom: 24,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  commentText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    lineHeight: 18,
    color: '#212121',
    marginBottom: 8,
  },
  commentTimeText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
    lineHeight: 12,
    color: '#BDBDBD',
  },
});

export default CommentsScreen;
