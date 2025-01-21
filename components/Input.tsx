import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Modal,
  Alert,
} from "react-native";
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
  dismissModal: Function;
}) => {
  const [txt, setTxt] = useState("");

  const [isFocus, setFocus] = useState(false);

  function handleConfirm() {
    props.inputHandler(txt);
  }

  function handleCancel() {
    Alert.alert("Alert!", "Sure to cancel?", [
      {
        text: "Cancel",
      },
      {
        text: "OK",
        onPress: () => {
          props.dismissModal();
          //console.log("!!!" + props.modalVisible);
        },
      },
    ]);
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
        <View style={styles.row}>
          <Button title="Confirm" onPress={handleConfirm} />

          <Button title="Cancel" onPress={handleCancel} />
        </View>
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
    marginHorizontal: 100,
    marginVertical: 330,
  },
  row: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-evenly",
    marginTop: 30,
    //borderWidth: 1,
  },
  spacing: {
    width: 15, // Adjust the width to add more or less spacing
  },
});

export default Input;
