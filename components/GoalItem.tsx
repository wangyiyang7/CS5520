/*rnfs*/
import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Goal } from "@/App";

export default function GoalItem(props: { item: Goal; delete: () => void }) {
  return (
    <View style={styles.userTyped}>
      <Text style={{ fontSize: 80 }}>{props.item.text}</Text>
      <Button title="x" onPress={() => props.delete()} />
    </View>
  );
}

/*
export default function GoalItem(props: { item: Goal; delete: Function }) {
  return (
    <View style={styles.userTyped}>
      <Text style={{ fontSize: 80 }}>{props.item.text}</Text>
      <Button title="x" onPress={() => props.delete(props.item.id)} />
    </View>
  );
}
*/
const styles = StyleSheet.create({
  userTyped: {
    marginTop: 30,
    backgroundColor: "#fff8dc",
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
    //borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
