import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
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

export async function deleteFromDB(id: string, collectionName: string) {
  try {
    await deleteDoc(doc(database, collectionName, id));
  } catch (e) {}
}
