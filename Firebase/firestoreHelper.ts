import { collection, addDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { database } from "./firebaseSetup";

export interface GoalData {
  text: string;
}

export async function writeToDB(data: GoalData, collectionName: string) {
  try {
    await addDoc(collection(database, collectionName), data);
  } catch (err) {
    //console.log(err);
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
