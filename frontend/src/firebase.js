import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Paste YOUR unique config object here
const firebaseConfig = {
  apiKey: "AIzaSyBwYcwAi5kzeC-ESHtlQkR9mBK_SbjOmIg",
  authDomain: "symbiosisai-53b88.firebaseapp.com",
  projectId: "symbiosisai-53b88",
  storageBucket: "symbiosisai-53b88.firebasestorage.app",
  messagingSenderId: "94098043301",
  appId: "1:94098043301:web:6788e93a4e0a221931384c",
  measurementId: "G-NXRWD2NYLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and the Google Provider for your Login.jsx
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();