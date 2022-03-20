// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
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
const app = initializeApp(firebaseConfig);
export default getFirestore();
