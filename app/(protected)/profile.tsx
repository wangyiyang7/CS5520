import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth } from "@/Firebase/firebaseSetup";
import LocationManager from "@/components/LocationManager";

const profile = () => {
  return (
    <View>
      <Text>{auth.currentUser?.email}</Text>
      <LocationManager />
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});
