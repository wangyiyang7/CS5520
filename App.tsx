import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Header from "./components/Header";
import Input from "./components/Input";
import { useState } from "react";

export default function App() {
  const appName = "OnePlus APP";
  let autofocus: boolean = true;
  const [inputText, setInputText] = useState("");

  function handleInputData(inputText: string) {
    console.log("Parent: ", inputText);
    setInputText(inputText);

  }
  return (
    <View style={styles.container}>
      <Header name={appName} />
      <StatusBar style="auto" />
      <Input x={autofocus} inputHandler={handleInputData} />
      <Text>User typed: {inputText}</Text>
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
