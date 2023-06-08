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
import { useDispatch, useSelector } from 'react-redux';
import { doLogin } from '../../redux/auth/operations';

const initialState = {
  email: '',
  password: '',
};

const LoginScreen = ({ navigation }) => {
  const [credentials, setCredentials] = useState(initialState);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isKeybordHidden, setIsKeybordHidden] = useState(true);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const dispatch = useDispatch();

  const state = useSelector(({ auth }) => auth);

  const { width, height } = useWindowDimensions();

  const togglePassVisible = () => {
    setIsPasswordHidden(prevState => !prevState);
  };

  const onKeyboardClose = () => {
    setIsKeybordHidden(true);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    console.log(credentials);
    dispatch(doLogin(credentials));
    setCredentials(initialState);
    // navigation.navigate('Home');
  };

  return (
    <TouchableWithoutFeedback onPress={onKeyboardClose}>
      <View style={styles.container}>
        {state.isLoading && (
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
          source={require('../../assets/images/mountainBg.jpg')}
          style={{
            ...styles.bgImage,
            width: width,
            height: height,
          }}
        >
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' && 'padding'}>
            <View
              style={{
                ...styles.formContainer,
                paddingBottom: isKeybordHidden ? 144 : 32,
                width: width,
              }}
            >
              <View
                style={{
                  width: width - 16 * 2,
                }}
              >
                <View style={styles.titleBox}>
                  <Text style={styles.title}>Войти</Text>
                </View>
                <View style={{ marginBottom: 16 }}>
                  <TextInput
                    placeholder="Адрес электронной почты"
                    placeholderTextColor={'#BDBDBD'}
                    value={credentials.email}
                    style={{
                      ...styles.input,
                      borderColor: isEmail ? '#FF6C00' : '#E8E8E8',
                      backgroundColor: isEmail ? '#ffffff' : '#F6F6F6',
                    }}
                    onFocus={() => {
                      setIsKeybordHidden(false);
                      setIsEmail(true);
                    }}
                    onBlur={() => setIsEmail(false)}
                    onChangeText={text =>
                      setCredentials(prevState => ({
                        ...prevState,
                        email: text,
                      }))
                    }
                    onSubmitEditing={() => setIsKeybordHidden(true)}
                  />
                </View>
                <View>
                  <TextInput
                    placeholder="Пароль"
                    placeholderTextColor={'#BDBDBD'}
                    value={credentials.password}
                    style={{
                      ...styles.input,
                      borderColor: isPassword ? '#FF6C00' : '#E8E8E8',
                      backgroundColor: isPassword ? '#ffffff' : '#F6F6F6',
                    }}
                    secureTextEntry={isPasswordHidden}
                    onFocus={() => {
                      setIsKeybordHidden(false);
                      setIsPassword(true);
                    }}
                    onBlur={() => setIsPassword(false)}
                    onChangeText={text =>
                      setCredentials(prevState => ({
                        ...prevState,
                        password: text,
                      }))
                    }
                    onSubmitEditing={() => setIsKeybordHidden(true)}
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.passBtn}
                    onPress={togglePassVisible}
                  >
                    <Text style={styles.passText}>
                      {isPasswordHidden ? 'Показать' : 'Скрыть'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {isKeybordHidden && (
                  <View style={{ marginTop: 43 }}>
                    <TouchableOpacity
                      disabled={
                        credentials.email === '' || credentials.password === ''
                          ? true
                          : false
                      }
                      activeOpacity={0.8}
                      style={{
                        ...styles.submitBtn,
                        backgroundColor:
                          credentials.email === '' ||
                          credentials.password === ''
                            ? '#F6F6F6'
                            : '#FF6C00',
                      }}
                      onPress={onSubmit}
                    >
                      <Text
                        style={{
                          ...styles.submitText,
                          color:
                            credentials.email === '' ||
                            credentials.password === ''
                              ? '#BDBDBD'
                              : '#ffffff',
                        }}
                      >
                        Войти
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        alignSelf: 'center',
                      }}
                      onPress={() => navigation.navigate('Registration')}
                    >
                      <Text style={styles.linkText}>
                        Нет аккаунта? Зарегистрироваться
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  formContainer: {
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
    paddingTop: 32,
  },
  titleBox: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    lineHeight: 35,
    letterSpacing: 0.01,
    color: '#212121',
    fontFamily: 'Roboto-Medium',
  },
  input: {
    backgroundColor: '#F6F6F6',
    color: '#212121',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 19,
    paddingHorizontal: 16,
    height: 50,
    fontFamily: 'Roboto-Regular',
  },
  passBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  passText: {
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
    fontFamily: 'Roboto-Regular',
  },
  submitBtn: {
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  submitText: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Roboto-Regular',
  },
  linkText: {
    color: '#1B4371',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Roboto-Regular',
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

export default LoginScreen;
