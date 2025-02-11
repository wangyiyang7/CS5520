import { View, Text, Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { GoalData, readDocFromDB } from "../../Firebase/firestoreHelper";

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
  }
  return (
    <View>
      <Stack.Screen
        options={{
          headerTitle: goal ? (warning ? "Warning" : goal.text) : "",
          headerRight: () => {
            return <Button title="Warning" onPress={warningHandler} />;
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
