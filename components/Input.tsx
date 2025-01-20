import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import React from "react";
import { useState } from "react";
/*
interface InputProps {
  x: boolean;
  inputHandler: (data: string)=>void;
}
*/
const Input = (props: { x: boolean, inputHandler: Function }) => {
  const [txt, setTxt] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [isFocus, setFocus] = useState(false);
  

  //console.log(props.x);

  function handleConfirm() {
    console.log("Child: ", txt);
    props.inputHandler(txt);
  }

  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Input;
