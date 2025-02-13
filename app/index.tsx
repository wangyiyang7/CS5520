import { StatusBar } from "expo-status-bar";
import {
  Button,
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../components/Header";
import Input from "../components/Input";
import React, { useEffect, useState } from "react";
import GoalItem, { DeleteAll, Separator } from "../components/GoalItem";
import { database } from "../Firebase/firebaseSetup";
import { deleteFromDB, goalData, writeToDB } from "../Firebase/firestoreHelper";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";

export interface Goal {
  id: string;
  text: string;
}

export default function App() {
  //console.log(database);
  const appName = "Balding APP";
  let autofocus: boolean = true;
  const [inputText, setInputText] = useState("");
  const [modalVisible, setVisible] = useState(false);
  const [goalList, setGoalList] = useState<Goal[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, "goals"),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setGoalList([]);
          console.log("empty");
        } else {
          let goalsArray: Goal[] = [];
          querySnapshot.forEach((doc) => {
            goalsArray.push({ ...(doc.data() as goalData), id: doc.id });
          });
          setGoalList(goalsArray);
          //console.log(goalsArray);
        }
      }
    );
    return () => unsubscribe();
  }, []);

  //function handleInputData(inputText: string) {
  //setInputText(inputText);
  function handleInputData(inputText: string) {
    setInputText(inputText);
    //let newGoal: Goal = { text: inputText, id: Math.random().toString() };
    //setGoalList([...goalList, newGoal]);
    setVisible(false);
    //setGoalList((prev) => {
    //   return [...prev, newGoal];
    // });
    let newGoal_: goalData = { text: inputText };
    writeToDB(newGoal_, "goals");
  }

  function handleVisibleTrue() {
    setVisible(true);
  }

  function handleVisibileFlase() {
    setVisible(false);
    //console.log("!!!??" + modalVisible);
  }

  function handleDelete(deleteNum: string) {
    // const newGoalList = goalList.filter((x) => x.id != deleteNum);
    //console.log(newGoalList);
    // setGoalList(newGoalList);
    deleteFromDB(deleteNum, "goals");
  }

  function handleDeleteAll() {
    setGoalList([]);
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
        <FlatList
          contentContainerStyle={{ alignItems: "center" }}
          data={goalList}
          ListEmptyComponent={
            <Text style={{ marginTop: 10, fontSize: 30, color: "purple" }}>
              No goals to show
            </Text>
          }
          ListHeaderComponent={() =>
            goalList.length > 0 && (
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  fontSize: 30,
                  color: "purple",
                }}
              >
                My Goal List
              </Text>
            )
          }
          ListFooterComponent={() =>
            goalList.length > 0 && <DeleteAll deleteAll={handleDeleteAll} />
          }
          ItemSeparatorComponent={Separator}
          renderItem={({ item }) => {
            return (
              <View>
                {/*
                  <View style={styles.userTyped}>
                    <Text style={{ fontSize: 80 }}>{item.text}</Text>
                  </View>
                  */}

                <GoalItem item={item} delete={() => handleDelete(item.id)} />
              </View>
            );
          }}
        />
        {/*
          <ScrollView contentContainerStyle={{ alignItems: "center" }}>
            {goalList.map((x) => {
              return (
                <View key={x.id} style={styles.userTyped}>
                  <Text style={{ fontSize: 80 }}>{x.text}</Text>
                </View>
              );
            })}
          </ScrollView>
          */}
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
    //alignItems: "center",
  },
  userTyped: {
    marginTop: 30,
    backgroundColor: "#fff8dc",
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
    //borderWidth: 1,
  },
});
