// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWdVQZEcwg6LDBNBkHmrk9NSdnUZXJLYg",
  authDomain: "shield-room.firebaseapp.com",
  projectId: "shield-room",
  storageBucket: "shield-room.firebasestorage.app",
  messagingSenderId: "260000479740",
  appId: "1:260000479740:web:70d9dedce9de046f279a79",
  measurementId: "G-LC34R1HDWW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);