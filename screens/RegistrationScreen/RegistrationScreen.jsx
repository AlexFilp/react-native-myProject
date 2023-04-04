import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  useWindowDimensions,
  Platform,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const RegistrationScreen = () => {
  const [credentials, setCredentials] = useState(initialState);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isKeybordHidden, setIsKeybordHidden] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const { width, height } = useWindowDimensions();

  const togglePassVisible = () => {
    setIsPasswordHidden((prevState) => !prevState);
  };

  const onKeyboardClose = () => {
    setIsKeybordHidden(true);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    console.log(credentials);
    setCredentials(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={onKeyboardClose}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../..//assets/images/mountainBg.jpg")}
          style={{
            ...styles.bgImage,
            width: width,
            height: height,
          }}
        >
          <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
            <View
              style={{
                ...styles.formContainer,
                paddingBottom: isKeybordHidden ? 78 : 32,
                width: width,
              }}
            >
              <View style={styles.avatarThumb}>
                <Image
                  style={styles.avatar}
                  // source={require("../../assets/images/avatar.jpg")}
                />
                <TouchableOpacity activeOpacity={0.8} style={styles.avatarBtn}>
                  <AntDesign name="pluscircleo" size={25} color="#ff6c00" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: width - 16 * 2,
                }}
              >
                <View style={styles.titleBox}>
                  <Text style={styles.title}>Регистрация</Text>
                </View>
                <View style={{ marginBottom: 16 }}>
                  <TextInput
                    placeholder="Логин"
                    placeholderTextColor={"#BDBDBD"}
                    value={credentials.login}
                    style={{
                      ...styles.input,
                      borderColor: isLogin ? "#FF6C00" : "#E8E8E8",
                      backgroundColor: isLogin ? "#ffffff" : "#F6F6F6",
                    }}
                    onFocus={() => {
                      setIsKeybordHidden(false);
                      setIsLogin(true);
                    }}
                    onBlur={() => setIsLogin(false)}
                    onChangeText={(text) =>
                      setCredentials((prevState) => ({
                        ...prevState,
                        login: text,
                      }))
                    }
                  />
                </View>
                <View style={{ marginBottom: 16 }}>
                  <TextInput
                    placeholder="Адрес электронной почты"
                    placeholderTextColor={"#BDBDBD"}
                    value={credentials.email}
                    style={{
                      ...styles.input,
                      borderColor: isEmail ? "#FF6C00" : "#E8E8E8",
                      backgroundColor: isEmail ? "#ffffff" : "#F6F6F6",
                    }}
                    onFocus={() => {
                      setIsKeybordHidden(false);
                      setIsEmail(true);
                    }}
                    onBlur={() => setIsEmail(false)}
                    onChangeText={(text) =>
                      setCredentials((prevState) => ({
                        ...prevState,
                        email: text,
                      }))
                    }
                  />
                </View>
                <View>
                  <TextInput
                    placeholder="Пароль"
                    placeholderTextColor={"#BDBDBD"}
                    value={credentials.password}
                    style={{
                      ...styles.input,
                      borderColor: isPassword ? "#FF6C00" : "#E8E8E8",
                      backgroundColor: isPassword ? "#ffffff" : "#F6F6F6",
                    }}
                    secureTextEntry={isPasswordHidden}
                    onFocus={() => {
                      setIsKeybordHidden(false);
                      setIsPassword(true);
                    }}
                    onBlur={() => setIsPassword(false)}
                    onChangeText={(text) =>
                      setCredentials((prevState) => ({
                        ...prevState,
                        password: text,
                      }))
                    }
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.passBtn}
                    onPress={togglePassVisible}
                  >
                    <Text style={styles.passText}>
                      {isPasswordHidden ? "Показать" : "Скрыть"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {isKeybordHidden && (
                  <View style={{ marginTop: 43 }}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.submitBtn}
                      onPress={onSubmit}
                    >
                      <Text style={styles.submitText}>Зарегистрироваться</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.link}>
                      <Text style={styles.linkText}>
                        Уже есть аккаунт? Войти
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
    backgroundColor: "#fff",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  formContainer: {
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    paddingTop: 92,
  },
  avatarThumb: {
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",
    top: -60,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  avatarBtn: {
    position: "absolute",
    width: 25,
    height: 25,
    bottom: 14,
    right: -12,
  },
  titleBox: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",
    fontFamily: "Roboto-Medium",
  },
  input: {
    color: "#212121",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 19,
    paddingHorizontal: 16,
    height: 50,
    fontFamily: "Roboto-Regular",
  },
  passBtn: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  passText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
  },
  submitBtn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  link: {
    alignItems: "center",
  },
  linkText: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
});
