import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { database } from "./firebaseSetup";

export interface GoalData {
  text: string;
}

export async function writeToDB(data: GoalData, collectionName: string) {
  try {
    await addDoc(collection(database, collectionName), data);
  } catch (err) {
    throw err;
  }
}

export async function deleteFromDB(id: string, collectionName: string) {
  try {
    await deleteDoc(doc(database, collectionName, id));
  } catch (e) {}
}

export async function readDocFromDB(id: string, collectionName: string) {
  try {
    const docRef = doc(database, collectionName, id);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      return docSnapshot.data();
    }
    return null;
  } catch (e) {
    console.error("Error reading document: ", e);
  }
}

export async function updateDB(
  id: string,
  collectionName: string,
  data: { [key: string]: any }
) {
  try {
    await setDoc(doc(database, collectionName, id), data, { merge: true });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}
