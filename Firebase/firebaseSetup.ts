// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyAv436wAOTd-ByVOClrYrIkSFsOCcL-My4",
  authDomain: "my-app-8d15b.firebaseapp.com",
  projectId: "my-app-8d15b",
  storageBucket: "my-app-8d15b.firebasestorage.app",
  messagingSenderId: "175067341853",
  appId: "1:175067341853:web:44f891dad89e1de5f092f4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
