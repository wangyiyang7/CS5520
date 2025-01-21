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

  const [isFocus, setFocus] = useState(false);

  function handleConfirm() {
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
  modalView: {
    flex: 1,
    backgroundColor: "#dcdcdc",
    borderRadius: 20,
    //padding: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 110,
    marginVertical: 310,
  },
});

export default Input;
