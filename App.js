import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";

import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <RegistrationScreen />
      {/* <LoginScreen/> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
