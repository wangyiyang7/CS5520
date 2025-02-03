import { collection, addDoc } from "firebase/firestore";
import { database } from "./firebaseSetup";

export interface goalData {
  text: string;
}

export async function writeToDB(data: goalData, collectionName: string) {
  try {
    await addDoc(collection(database, collectionName), data);
  } catch (err) {
    console.log(err);
  }
}
