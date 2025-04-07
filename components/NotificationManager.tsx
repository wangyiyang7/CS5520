import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  cancelAllScheduledNotificationsAsync,
  getPermissionsAsync,
  requestPermissionsAsync,
  SchedulableTriggerInputTypes,
  scheduleNotificationAsync,
} from "expo-notifications";

export default function NotificationManager() {
  async function verifyPermission() {
    try {
      const permissionResponse = await getPermissionsAsync();
      if (permissionResponse?.status === "granted") {
        return true;
      }
      const responseFromUser = await requestPermissionsAsync();
      return responseFromUser.granted;
    } catch (e) {
      console.log("Error in verifyPermission", e);
    }
  }
  async function scheduleNotificationHandler() {
    try {
      await cancelAllScheduledNotificationsAsync();

      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert(
          "Permission not granted",
          "Please enable notifications in settings"
        );
        return;
      }
      scheduleNotificationAsync({
        content: {
          title: "Daily Goals Reminder",
          body: "Don't forget to add your daily goals!",
          data: { url: "http://www.google.com" },
        },
        trigger: {
          seconds: 3,
          type: SchedulableTriggerInputTypes.TIME_INTERVAL,
          repeats: false,
        },
      });
    } catch (e) {
      console.log("Error in scheduling notification", e);
    }
  }

  return (
    <View>
      <Button
        title="Remind me to add my daily goals"
        onPress={scheduleNotificationHandler}
      />
      <Button
        title="Cancel Notification"
        onPress={async () => {
          await cancelAllScheduledNotificationsAsync();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
