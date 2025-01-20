import { StyleSheet, View, Text, TextInput, Button, Modal } from "react-native";
import React from "react";
import { useState } from "react";
/*
interface InputProps {
  x: boolean;
  inputHandler: (data: string)=>void;
}
*/
const Input = (props: {
  x: boolean;
  inputHandler: Function;
  modalVisible: boolean;
}) => {
  const [txt, setTxt] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [isFocus, setFocus] = useState(false);

  //console.log(props.x);

  function handleConfirm() {
    //console.log("Child: ", txt);
    props.inputHandler(txt);
  }

  return (
    <Modal
      visible={props.modalVisible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalView}>
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
            {txt.length >= 3
              ? "Thank you"
              : "Please type more than 3 characters"}
          </Text>
        ) : null}
        <Button title="Confirm" onPress={handleConfirm} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginBottom: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 50,
    marginVertical: 350,
    backgroundColor: "yellow",
    borderRadius: 20,
    //padding: 55,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
  },
  bottomContainer: {
    flex: 4,
  },
});

export default Input;
