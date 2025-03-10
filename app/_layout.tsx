import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Slot } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Firebase/firebaseSetup";

const _layout = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUserLoggedIn(true);
      } else {
        // User is signed out
        setUserLoggedIn(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return <Slot />;
};

export default _layout;

const styles = StyleSheet.create({});
