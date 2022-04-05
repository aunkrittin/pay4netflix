// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6LJwP_YhLWGyK4z6xPavuNxOvxmfSpfo",
  authDomain: "pay4netflix.firebaseapp.com",
  projectId: "pay4netflix",
  storageBucket: "pay4netflix.appspot.com",
  messagingSenderId: "117745885896",
  appId: "1:117745885896:web:fb8f87aa20aed14725fbfd",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export default getFirestore();
