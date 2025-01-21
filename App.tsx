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

        <View style={styles.buttonContainer}>
          <Button title="Add a goal" onPress={handleVisible} />
        </View>
      </View>
      <Input
        x={autofocus}
        inputHandler={handleInputData}
        modalVisible={modalVisible}
      />
      <View style={styles.bottomContainer}>
        {inputText.length > 0 ? (
          <View style={styles.userTyped}>
            <Text>{inputText}</Text>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    width: "30%",
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
  },
  userTyped: {
    margin: 10,
    backgroundColor: "#fff8dc",
    borderRadius: 5,
    padding: 10,
  },
});
