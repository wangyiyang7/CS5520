import * as Location from "expo-location";
import { useState } from "react";
import { Button, View, Image } from "react-native";

const LocationManager = () => {
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
  return (
    <View>
      <Button title="Find My Location" onPress={locateUserHandler} />
      <Image
        source={{
          uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location?.coords.latitude},${location?.coords.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location?.coords.latitude},${location?.coords.longitude}&key=${process.env.EXPO_PUBLIC_mapsApiKey}`,
        }}
        style={{
          width: 400,
          height: 400,
        }}
      />
    </View>
  );
};

export default LocationManager;
