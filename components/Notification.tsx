import * as Notifications from "expo-notifications";
import { Button } from "react-native";

export default function NotificationManager() {
  const scheduleNotificationHandler = async () => {
    try {
      const settings = await Notifications.getPermissionsAsync();
      console.log(settings);

      await Notifications.scheduleNotificationAsync({
        content: { title: "", body: "" },
        trigger: {
          seconds: 10,
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          repeats: false,
        },
      });
    } catch (err) {}
  };
  return (
    <Button title="Set a notification" onPress={scheduleNotificationHandler} />
  );
}
