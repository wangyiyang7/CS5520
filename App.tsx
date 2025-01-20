import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Header from "./components/Header";
import Input from "./components/Input";
import { useState } from "react";

export default function App() {
  const appName = "OnePlus APP";
  let autofocus: boolean = true;
  const [inputText, setInputText] = useState("");
  const [modalVisible, setVisible] = useState(false);

  function handleInputData(inputText: string) {
    //console.log("Parent: ", inputText);
    setInputText(inputText);
    setVisible(false);
  }

  function handleVisible() {
    setVisible(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header name={appName} />
      <StatusBar style="auto" />
      <Input
        x={autofocus}
        inputHandler={handleInputData}
        modalVisible={modalVisible}
      />
      <Text>User typed: {inputText}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Add a goal" onPress={handleVisible} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginBottom: 10,
  },
  buttonContainer: {
    width: "30%",
    margin: 10,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#dcd",
  },
});
