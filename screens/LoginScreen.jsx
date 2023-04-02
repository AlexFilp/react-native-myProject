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
  Dimensions,
} from "react-native";
import { useState } from "react";

export const LoginScreen = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const { width } = useWindowDimensions();

  const togglePassVisible = () => {
    setIsPasswordHidden((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("..//assets/images/mountainBg.jpg")}
        style={styles.bgImage}
      >
        <View style={styles.formContainer}>
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
                placeholder="Логин"
                placeholderTextColor={"#BDBDBD"}
                style={{
                  ...styles.input,
                }}
              />
            </View>
            <View style={{ marginBottom: 16 }}>
              <TextInput
                placeholder="Адрес электронной почты"
                placeholderTextColor={"#BDBDBD"}
                style={{
                  ...styles.input,
                }}
              />
            </View>
            <View style={{ marginBottom: 43 }}>
              <TextInput
                placeholder="Пароль"
                placeholderTextColor={"#BDBDBD"}
                style={styles.input}
                secureTextEntry={isPasswordHidden}
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
            <TouchableOpacity style={styles.submitBtn}>
              <Text style={styles.submitText}>Зарегистрироваться</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link}>
              <Text style={styles.linkText}>
                Нет аккаунта? Зарегистрироваться
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    paddingTop: 323,
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    paddingTop: 32,
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
  },
  input: {
    backgroundColor: "#F6F6F6",
    color: "#212121",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 19,
    paddingHorizontal: 16,
    height: 50,
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
  },
  link: {
    alignItems: "center",
  },
  linkText: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
  },
});
