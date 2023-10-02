// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDO3falfYzT2jYl6tWdKbYnbVMzQ4aY8Y",
  authDomain: "bookapp-af12f.firebaseapp.com",
  projectId: "bookapp-af12f",
  storageBucket: "bookapp-af12f.appspot.com",
  messagingSenderId: "360071287113",
  appId: "1:360071287113:web:9b874c2416874abbc50a98"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase