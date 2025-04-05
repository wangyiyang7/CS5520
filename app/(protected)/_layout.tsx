import PressableButton from "@/components/PressableButton";
import { router, Stack } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { signOut } from "firebase/auth";
import { auth } from "@/Firebase/firebaseSetup";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "purple" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "All My Goals",
          headerRight: () => {
            return (
              <PressableButton
                pressedInHandler={() => {
                  router.navigate("/(protected)/profile/");
                }}
                componentStyle={{ backgroundColor: "transparent" }}
                children={<AntDesign name="user" size={24} color="black" />}
              ></PressableButton>
            );
          },
        }}
      />
      <Stack.Screen
        name="goals/[id]"
        options={{
          headerTitle: "Goal Details",
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          headerRight: () => {
            return (
              <PressableButton
                pressedInHandler={() => {
                  signOut(auth);
                }}
                componentStyle={{ backgroundColor: "transparent" }}
                children={<AntDesign name="logout" size={24} color="black" />}
              ></PressableButton>
            );
          },
        }}
      />
    </Stack>
  );
}
