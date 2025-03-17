import { Button, Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import {
  launchCameraAsync,
  requestCameraPermissionsAsync,
  useCameraPermissions,
} from "expo-image-picker";

const ImageManager = (prop: { imageUriHandler: (uri: String) => void }) => {
  const [permissionResponse, requestPermission] = useCameraPermissions();
  const [imageURI, setImageURI] = useState("");

  const verifyPermission = async () => {
    if (permissionResponse?.granted) return;
    try {
      const afterRequest = await requestCameraPermissionsAsync();
      if (afterRequest?.granted) {
        return true;
      }
    } catch (err) {}
  };

  const takeImageHandler = async () => {
    await verifyPermission();
    try {
      const result = await launchCameraAsync({ allowsEditing: true });
      console.log(result);
      if (result?.assets) {
        setImageURI(result?.assets[0].uri);
        prop.imageUriHandler(result?.assets[0].uri);
      }
    } catch (err) {}
  };
  return (
    <View>
      <Button title="Take a photo" onPress={takeImageHandler} />
      {imageURI && (
        <Image
          source={{ uri: imageURI }}
          style={styles.image}
          alt="Image of a an arrow"
        />
      )}
    </View>
  );
};

export default ImageManager;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginVertical: 5,
  },
});
