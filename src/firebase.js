import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWv3oYHnntXhb5BMhkElXcmfkSZYuhwUE",
  authDomain: "student-3b189.firebaseapp.com",
  databaseURL: "https://student-3b189-default-rtdb.firebaseio.com",
  projectId: "student-3b189",
  storageBucket: "student-3b189.firebasestorage.app",
  messagingSenderId: "607558211374",
  appId: "1:607558211374:web:87ff170e89e291f4a84cbf",
  measurementId: "G-WC54P5VM5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };
