import { Alert, Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Goal } from "@/App";
import PressableButton from "./PressableButton";
import Ionicons from "@expo/vector-icons/Ionicons";

interface GoalItemProps {
  goalObj: Goal;
  deleteHandler: (deletedId: string) => void;
  separators: any;
}

export default function GoalItem({
  goalObj,
  deleteHandler,
  separators,
}: GoalItemProps) {
  return (
    <Pressable
      android_ripple={styles.androidRipple}
      style={({ pressed }) => {
        return [styles.textContainer, pressed && styles.pressed];
      }}
      onPressIn={separators.highlight}
      onPressOut={separators.unhighlight}
      onPress={() => {
        router.navigate(`/goals/${goalObj.id}`);
      }}
      onLongPress={() => {
        Alert.alert("Delete", "Are you sure you want to delete this goal?", [
          {
            text: "Yes",
            onPress: () => {
              deleteHandler(goalObj.id);
            },
          },
          { text: "No", style: "cancel" },
        ]);
      }}
    >
      <Text style={styles.text}>{goalObj.id} </Text>
      <PressableButton
        pressedHandler={() => {
          //pass the id
          deleteHandler(goalObj.id);
        }}
        pressedStyle={styles.pressed}
        componentStyle={styles.deleteIcon}
      >
        <Ionicons name="trash" size={24} color="black" />
      </PressableButton>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "#aaa",
    padding: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    color: "purple",
    fontSize: 20,
  },
  pressed: {
    backgroundColor: "grey",
    opacity: 0.5,
  },
  androidRipple: { color: "red" },
  deleteIcon: {
    backgroundColor: "#aaa",
  },
});
