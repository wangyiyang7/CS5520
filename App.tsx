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
  const appName = "Balding APP";
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
      <StatusBar style="auto" />
      <View style={styles.topContainer}>
        <Header name={appName} />
        <Input
          x={autofocus}
          inputHandler={handleInputData}
          modalVisible={modalVisible}
        />
        <View style={styles.buttonContainer}>
          <Button title="Add a goal" onPress={handleVisible} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text>User typed: {inputText}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    //alignItems: "center",
    //justifyContent: "center",
  },
  buttonContainer: {
    width: "30%",
    margin: 10,
    marginBottom: 10,
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: "#dcd",
    alignItems: "center",
    //justifyContent: "center",
  },
});
