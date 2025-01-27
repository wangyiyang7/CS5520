import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import Input from "./components/Input";
import { useState } from "react";

interface Goal {
  id: number;
  text: string;
}

export default function App() {
  const appName = "Balding APP";
  let autofocus: boolean = true;
  const [inputText, setInputText] = useState("");
  const [modalVisible, setVisible] = useState(false);
  const [goalList, setGoalList] = useState<Goal[]>([]);

  //function handleInputData(inputText: string) {
  //setInputText(inputText);
  function handleInputData(inputText: string) {
    setInputText(inputText);
    let newGoal: Goal = { text: inputText, id: Math.random() };
    //setGoalList([...goalList, newGoal]);
    setVisible(false);
    setGoalList((prev) => {
      return [...prev, newGoal];
    });
  }

  function handleVisibleTrue() {
    setVisible(true);
  }

  function handleVisibileFlase() {
    setVisible(false);
    //console.log("!!!??" + modalVisible);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topContainer}>
        <Header name={appName} />
        <View style={styles.buttonContainer}>
          <Button title="Add a goal" onPress={handleVisibleTrue} />
        </View>
      </View>
      <Input
        x={autofocus}
        inputHandler={handleInputData}
        modalVisible={modalVisible}
        dismissModal={handleVisibileFlase}
      />
      <View style={styles.bottomContainer}>
        {inputText.length > 0 ? (
          <View>
            {goalList.map((x) => {
              return (
                <View key={x.id} style={styles.userTyped}>
                  <Text>{x.text}</Text>
                </View>
              );
            })}
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
    marginTop: 10,
    backgroundColor: "#fff8dc",
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
    borderWidth: 1,
  },
});
