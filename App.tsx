import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Header from "./components/Header";
import Input from "./components/Input";
import { useState } from "react";

export default function App() {
  const appName = "OnePlus APP";
  return (
    <View style={styles.container}>
      <Header name={appName} />
      <StatusBar style="auto" />
      <Input />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
