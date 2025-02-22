import { View, Text, Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { GoalData, readDocFromDB, updateDB } from "@/Firebase/firestoreHelper";
import PressableButton from "@/components/PressableButton";
import AntDesign from "@expo/vector-icons/AntDesign";

const GoalDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [goal, setGoal] = useState<GoalData | null>(null);
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const data = (await readDocFromDB(id, "goals")) as GoalData;
        if (data != null) {
          setGoal(data);
        }
      } catch (e) {}
    }
    getData();
  }, []);

  function warningHandler() {
    setWarning(true);
    updateDB(id, "goals", { warning: true });
  }

  return (
    <View>
      <Stack.Screen
        options={{
          headerTitle: goal ? (warning ? "Warning" : goal.text) : "",
          headerRight: () => {
            return (
              <PressableButton
                pressedHandler={warningHandler}
                componentStyle={{ backgroundColor: "transparent" }}
                children={<AntDesign name="warning" size={24} color="yellow" />}
              ></PressableButton>
            );
          },
        }}
      />
      <Text style={warning && styles.warningText}>Details of {goal?.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  warningText: { color: "red" },
});

export default GoalDetails;
