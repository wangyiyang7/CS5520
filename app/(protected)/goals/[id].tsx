import { View, Text, Button, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { readDocFromDB, updateDB } from "@/Firebase/firestoreHelper";
import PressableButton from "@/components/PressableButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GoalUsers } from "@/components/GoalUsers";
import { GoalData } from "@/types";
import { storage } from "@/Firebase/firebaseSetup";
import { getDownloadURL, ref } from "firebase/storage";

import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const GoalDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [goal, setGoal] = useState<GoalData | null>(null);
  const [warning, setWarning] = useState(false);
  const [url, setURL] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const data = (await readDocFromDB(id, "goals")) as GoalData;

        if (data != null) {
          setGoal(data);
        }

        if (data.uri) {
          const imageRef = ref(storage, data.uri);
          const downloadUrl = await getDownloadURL(imageRef);
          console.log(downloadUrl);

          setURL(downloadUrl);
        }
      } catch (e) {}
    }
    getData();
  }, []);

  async function warningHandler() {
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
      <GoalUsers goalID={id} />
      <Image
        source={{
          uri: url,
        }}
        style={{
          width: 200,
          height: 200,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  warningText: { color: "red" },
});

export default GoalDetails;
