import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { GoalData, readDocFromDB } from "../../Firebase/firestoreHelper";

const GoalDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [goal, setGoal] = useState<GoalData | null>(null);
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
  return (
    <View>
      <Text>Details of {goal?.text}</Text>
    </View>
  );
};

export default GoalDetails;
