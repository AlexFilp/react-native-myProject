import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";

import { LoginScreen } from "./screens/LoginScreen/LoginScreen";
import { RegistrationScreen } from "./screens/RegistrationScreen/RegistrationScreen";
import { Test } from "./screens/Test/Test";

export default function App() {
  return (
    <View style={styles.container}>
      <RegistrationScreen />
      {/* <LoginScreen /> */}
      {/* <Test /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
