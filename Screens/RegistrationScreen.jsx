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

import { AntDesign } from "@expo/vector-icons";

export const RegistrationScreen = () => {
  const { width } = useWindowDimensions();

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <ImageBackground
          source={require("..//assets/images/mountainBg.jpg")}
          style={styles.bgImage}
        >
          <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
            <View style={styles.form}>
              <View style={styles.avatarThumb}>
                <Image
                  style={styles.avatar}
                  source={require("../assets/images/avatar.jpg")}
                />
                <TouchableOpacity activeOpacity={0.8} style={styles.avatarBtn}>
                  <AntDesign name="pluscircleo" size={25} color="#ff6c00" />
                </TouchableOpacity>
              </View>
              <View style={{ width: width - 2 * 16 }}>
                <View style={styles.titleBox}>
                  <Text style={styles.title}>Регистрация</Text>
                </View>
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
    justifyContent: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  form: {
    flex: 1,
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    position: "relative",
    paddingTop: 92,
  },
  avatarThumb: {
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    top: -60,
    position: "absolute",
  },
  avatar: {
    width: 120,
    height: 120,
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
    justifyContent: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",
  },
});
