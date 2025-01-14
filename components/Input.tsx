import { View, Text, TextInput } from "react-native";
import React from "react";
import { useState } from "react";

const Input = () => {
  const [txt, setTxt] = useState("");
  return (
    <View>
      <TextInput
        placeholder="place holder "
        onChangeText={(changedTxt: string) => setTxt(changedTxt)}
        value={txt}
      />
    </View>
  );
};

export default Input;
