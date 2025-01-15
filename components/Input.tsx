import { View, Text, TextInput } from "react-native";
import React from "react";
import { useState } from "react";

const Input = (props: { x: boolean }) => {
  const [txt, setTxt] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [isFocus, setFocus] = useState(false);

  console.log(props.x);

  return (
    <View>
      <TextInput
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        autoFocus={props.x}
        placeholder="place holder"
        onChangeText={(changedTxt: string) => setTxt(changedTxt)}
        value={txt}
      />

      {isFocus && txt.length > 0 ? (
        <Text>{txt.length}</Text>
      ) : !isFocus && txt.length > 0 ? (
        <Text>
          {txt.length >= 3 ? "Thank you" : "Please type more than 3 characters"}
        </Text>
      ) : null}
    </View>
  );
};

export default Input;
