import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";

export const GoalUsers = () => {
  const [list, setList] = useState();
  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        const data = await response.json();
        // const userNames = data.forEach();
        setList(data);
      } catch (e) {
        throw e;
      }
    }
    getUsers();
  }, []);
  return (
    <View>
      <Text>GoalUsers</Text>
      <FlatList
        data={list}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
