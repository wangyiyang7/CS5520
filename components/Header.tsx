import { View, Text } from "react-native";
import React from "react";

interface HeaderProps {
  name: string;
}

//const Header = (props: { name: string }) => {
const Header = (props: HeaderProps) => {
  //console.log(props);
  return (
    <View>
      <Text>Welcome to {props.name}</Text>
    </View>
  );
};

export default Header;
