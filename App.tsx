import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Header from "./components/Header";
import { useState } from "react";

export default function App() {
  const [txt, setTxt] = useState("");

  const appName = "OnePlus APP";
  return (
    <View style={styles.container}>
      <Header name={appName} />
      <StatusBar style="auto" />
      <TextInput
        placeholder="place holder"
        onChangeText={(changedTxt: string) => setTxt(changedTxt)}
        value={txt}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
