import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth } from "@/Firebase/firebaseSetup";

const profile = () => {
  return (
    <View>
      <Text>{auth.currentUser?.email}</Text>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});
