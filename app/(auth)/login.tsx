import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/Firebase/firebaseSetup";
import { FirebaseError } from "firebase/app";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      const userCredential = signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        "code" in error &&
        "message" in error
      ) {
        if (error.code === "") {
          Alert.alert("");
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Register"
        onPress={() => router.replace("/(auth)/signup")}
      />
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});
