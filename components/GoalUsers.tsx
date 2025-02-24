import { readAllFromDB, writeToDB } from "@/Firebase/firestoreHelper";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { User } from "@/types";

export const GoalUsers = (props: { goalID: string }) => {
  const [users, setUsers] = useState<String[]>([]);
  useEffect(() => {
    async function getUsers() {
      try {
        //check the database if the users are already there
        const userFromDB = await readAllFromDB(`goals/${props.goalID}/users`);
        console.log("read from db ");
        //if they are, set the users state to the users from the database
        if (userFromDB) {
          const userNames = userFromDB.map((user: User) => {
            return user.name;
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
          writeToDB(user, `goals/${props.goalID}/users`);
          return user.name;
        });
        setUsers(userNames);
        // write the users data to firestore using writeToDB
      } catch (err) {
        console.log("fetching users ", err);
      }
    }
    getUsers();
  }, []);
  return (
    <View>
      <Text>GoalUsers</Text>
      <FlatList data={users} renderItem={({ item }) => <Text>{item}</Text>} />
    </View>
  );
};
