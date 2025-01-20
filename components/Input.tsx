import { View, Text, TextInput, Button } from "react-native";
import React from "react";
import { useState } from "react";

const Input = (props: { x: boolean }) => {
  const [txt, setTxt] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [isFocus, setFocus] = useState(false);

  //console.log(props.x);

  function handleConfirm() {
    console.log("User typed: ", txt);
  }

  return (
    <View>
      <TextInput
        placeholder="place holder "
        onChangeText={(changedTxt: string) => setTxt(changedTxt)}
        value={txt}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        autoFocus={props.x}
      />

      {isFocus && txt.length > 0 ? (
        <Text>{txt.length}</Text>
      ) : !isFocus && txt.length > 0 ? (
        <Text>
          {txt.length >= 3 ? "Thank you" : "Please type more than 3 characters"}
        </Text>
      ) : null}
      <Button title="Confirm" onPress={handleConfirm}/>
    </View>
  );
};

export default Input;
