import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
  Button,
} from "react-native";
import { useState } from "react";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");

  const nameHandler = (name) => {
    setUsername(name);
  };

  const passwordHandler = (pass) => {
    setPassword(pass);
  };

  const onSubmit = () => {
    Alert.alert("Credentials", `Username: ${username}; Password: ${password};`);
  };

  console.log(username);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={nameHandler}
            placeholder="Username"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={passwordHandler}
            placeholder="Password"
          />
          <Button title={"LOG IN"} style={styles.button} onPress={onSubmit} />
        </KeyboardAvoidingView>

        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        backgroundColor: "lightgrey",
      },
      android: {
        backgroundColor: "lightblue",
      },
    }),
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    borderRadius: 100,
  },
  button: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    borderRadius: 100,
  },
});
