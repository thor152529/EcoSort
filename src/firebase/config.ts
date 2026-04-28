// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";      
import { getFirestore } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAlEfnzLDgK5UpaBnS3liEMv-K1HsRmyk4",
  authDomain: "ecosort-4946d.firebaseapp.com",
  projectId: "ecosort-4946d",
  storageBucket: "ecosort-4946d.firebasestorage.app",
  messagingSenderId: "633167010021",
  appId: "1:633167010021:web:4a3e3fae1367818cae9c0c",
  measurementId: "G-1YB56SEJ6L"
};

// 1. Initialize the App
const app = initializeApp(firebaseConfig);

// 2. Initialize Analytics (Optional but good for the challenge)
const analytics = getAnalytics(app);

// 3. Export these so your "GreenGuardians" project can use them!
export const auth = getAuth(app);
export const db = getFirestore(app);