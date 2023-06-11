import { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import moment from 'moment';
import { db } from '../../FireBase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '../../redux/dashboard/operations';
import { selectAllPosts } from '../../redux/dashboard/selectors';
// ICONS
import { AntDesign } from '@expo/vector-icons';

const CommentsScreen = ({ navigation, route }) => {
  const [isComment, setIsComment] = useState(false);
  const [comment, setComment] = useState('');
  const [isKeybordHidden, setIsKeybordHidden] = useState(true);
  const [doUpdate, setDoUpdate] = useState(0);

  const dispatch = useDispatch();

  const { postId, postImage } = route.params;

  const post = useSelector(selectAllPosts).find(item => item.id === postId);

  const postComments = post.data.photoComments;

  const { width, height } = useWindowDimensions();

  const date = moment().format('LL');
  const time = moment().format('LT');

  const addCommentToDoc = async postId => {
    try {
      const ref = doc(db, 'posts', postId);
      await updateDoc(ref, {
        photoComments: [
          ...postComments,
          { comment, postTime: `${date} | ${time}` },
        ],
      });
      setDoUpdate(prevState => (prevState += 1));
    } catch (error) {
      console.log(error);
    }
  };

  const onKeyboardClose = () => {
    setIsKeybordHidden(true);
    Keyboard.dismiss();
  };

  const addComment = () => {
    if (comment === '') {
      return;
    }
    addCommentToDoc(postId);
    setComment('');
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
            <Image style={styles.image} source={{ uri: postImage }}></Image>
            <View>
              <SafeAreaView>
                <FlatList
                  style={{
                    marginBottom: 31,
                    height: 323,
                  }}
                  data={postComments}
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
                        <Text style={styles.commentText}>{item.comment}</Text>
                        <Text style={styles.commentTimeText}>
                          {item.postTime}
                        </Text>
                      </View>
                      <Image
                        style={styles.profileImage}
                        source={require('../../assets/images/defaultAvatar.jpg')}
                      />
                    </View>
                  )}
                />
              </SafeAreaView>
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

// const getAllComments = async postId => {
//   try {
//     const docRef = doc(db, 'posts', postId);
//     const docSnap = await getDoc(docRef);

//     let allComments = [];

//     if (docSnap.exists()) {
//       const commentsData = docSnap.data().photoComments;
//       allComments = commentsData;
//     }

//     console.log('allComments ===>', allComments);

//     if (isActive) {
//       setComments(allComments);
//     }
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// useEffect(() => {
//   if (route.params) {
//     setImage(postImage);
//   }
// }, [route.params]);
