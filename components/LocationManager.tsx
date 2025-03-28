import * as Location from "expo-location";
import { useState } from "react";
import { Button, View, Image, Dimensions, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

const LocationManager = () => {
  const params = useLocalSearchParams();
  // if (params) update the location state variable
  console.log(params);
  const [response, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  async function locateUserHandler() {
    try {
      if (!response?.granted) {
        console.log(response?.granted);
        const hasPermission = await requestPermission();
      }

      const location_ = await Location.getCurrentPositionAsync({});
      setLocation(location_);
      console.log(location_?.coords.latitude, location_?.coords.longitude);
    } catch (err) {}
  }

  function chooseLocationHandler() {
    // navigate to the map screen
    router.navigate("map");
  }
  return (
    <View>
      <Button title="Find My Location" onPress={locateUserHandler} />
      {location && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location?.coords.latitude},${location?.coords.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location?.coords.latitude},${location?.coords.longitude}&key=${process.env.EXPO_PUBLIC_mapsApiKey}`,
          }}
          style={{
            width: Dimensions.get("window").width,
            height: 200,
            marginTop: 10,
          }}
        />
      )}
      <Button
        title="Let me choose on the map"
        onPress={chooseLocationHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: 200,
    marginTop: 10,
  },
});

export default LocationManager;
