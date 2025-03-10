import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "@/components/Header";
import Input from "@/components/Input";
import React, { useEffect, useState } from "react";
import GoalItem from "@/components/GoalItem";
import { database } from "@/Firebase/firebaseSetup";
import { deleteFromDB, writeToDB } from "@/Firebase/firestoreHelper";
import PressableButton from "@/components/PressableButton";
import { collection, onSnapshot } from "firebase/firestore";
import { GoalData } from "@/types";

export interface Goal extends GoalData {
  id: string;
}

export default function App() {
  const appName = "Balding APP";
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    //start the listener on real time changes on goals collection
    const unsubscribe = onSnapshot(
      collection(database, "goals"),
      (querySnapshot) => {
        //check if the querySnapshot is empty
        if (querySnapshot.empty) {
          setGoals([]);
        } else {
          let newArrayOfGoals: Goal[] = [];
          querySnapshot.forEach((docSnapshot) => {
            newArrayOfGoals.push({
              ...(docSnapshot.data() as GoalData),
              id: docSnapshot.id,
            });
          });

          setGoals(newArrayOfGoals);
        }
      }
    );
    //return a cleanup function to stop the listener
    return () => {
      unsubscribe();
    };
  }, []);

  function handleDeleteGoal(deletedId: string) {
    deleteFromDB(deletedId, "goals");
  }

  function handleInputData(data: string) {
    let newGoal: GoalData = { text: data };
    writeToDB(newGoal, "goals");
    setIsModalVisible(false);
  }

  function dismissModal() {
    setIsModalVisible(false);
  }

  function deleteAll() {
    Alert.alert("Delete All", "Are you sure you want to delete all goals?", [
      {
        text: "Yes",
        onPress: () => {
          setGoals([]);
        },
      },
      { text: "No", style: "cancel" },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topContainer}>
        <Header name={appName} />
        <Input
          textInputFocus={true}
          inputHandler={handleInputData}
          modalVisible={isModalVisible}
          dismissModal={dismissModal}
        />
        <PressableButton pressedHandler={() => setIsModalVisible(true)}>
          <Text style={styles.addGoalButton}>Add a Goal</Text>
        </PressableButton>
      </View>

      <View style={styles.bottomContainer}>
        <FlatList
          ItemSeparatorComponent={({ highlighted }) => (
            <View
              style={[
                {
                  height: 5,
                  backgroundColor: "gray",
                },
                highlighted && { backgroundColor: "purple" },
              ]}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.header}>No goals to show</Text>
          }
          ListHeaderComponent={
            goals.length > 0 ? (
              <Text style={styles.header}>My Goals List</Text>
            ) : null
          }
          ListFooterComponent={
            goals.length ? (
              <Button title="Delete all" onPress={deleteAll} />
            ) : null
          }
          contentContainerStyle={styles.centeredHorizontal}
          data={goals}
          renderItem={({ item, separators }) => {
            //pass the received item to GoalItem component as a prop
            return (
              <GoalItem
                goalObj={item}
                deleteHandler={handleDeleteGoal}
                separators={separators}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: "#dcd",
    // alignItems: "center",
  },
  centeredHorizontal: {
    alignItems: "center",
  },
  header: {
    color: "indigo",
    fontSize: 25,
    marginTop: 10,
  },
  addGoalButton: {
    padding: 5,
    fontSize: 15,
    color: "white",
  },
});
