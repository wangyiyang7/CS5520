import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { readAllFromDB, writeToDB } from "@/Firebase/firestoreHelper";
import { User } from "@/types";

interface GoalUsersProps {
  goalId: string;
}

export default function GoalUsers({ goalId }: GoalUsersProps) {
  const [users, setUsers] = useState<string[]>([]);
  useEffect(() => {
    async function getUsers() {
      try {
        //check the database if the users are already there
        const userFromDB = await readAllFromDB(`goals/${goalId}/users`);
        console.log("read from db ");
        //if they are, set the users state to the users from the database
        if (userFromDB) {
          const userNames = userFromDB.map((user: User) => {
            return user.name || "Unknown User";
          });
          setUsers(userNames);
          return;
        }
        //if they are not, fetch the users from the API
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        console.log("reeading from API");
        if (!response.ok) {
          throw new Error(
            `Something went wrong with the ${response.status} code`
          );
        }
        //The next lines will only execute if the response is ok
        // extract the json now
        const data = await response.json();

        const userNames = data.map((user: User) => {
          if (user.name) {
            writeToDB(user, `goals/${goalId}/users`);
            return user.name;
          }
          return "Unknown User";
        });
        setUsers(userNames);
        // write the users data to firestore using writeToDB
      } catch (err) {
        console.log("fetching users ", err);
        setUsers(["Error loading users"]);
      }
    }
    getUsers();
  }, []);
  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => {
          return <Text>{item}</Text>;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
