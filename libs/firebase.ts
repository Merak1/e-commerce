// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_Az1sQOzygyOtmz7NuOt_UDrqeoijbQw",
  authDomain: "jrl-shop.firebaseapp.com",
  projectId: "jrl-shop",
  storageBucket: "jrl-shop.appspot.com",
  messagingSenderId: "729891192940",
  appId: "1:729891192940:web:568ec691b1aae6e2eb1849",
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

export default FirebaseApp;
