import { View, Text, StyleSheet } from "react-native";
import React from "react";

interface HeaderProps {
  name: string;
}

//const Header = (props: { name: string }) => {
const Header = (props: HeaderProps) => {
  return (
    <View style={styles.headerView}>
      <Text style={{ fontSize: 20 }}>Welcome to {props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    margin: 30,
    borderWidth: 1,
    padding: 10,
  },
});

export default Header;
