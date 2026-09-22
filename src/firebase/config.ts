import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "AIzaSyAlEfnzLDgK5UpaBnS3liEMv-K1HsRmyk4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "ecosort-4946d.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "ecosort-4946d",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "ecosort-4946d.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "633167010021",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "1:633167010021:web:4a3e3fae1367818cae9c0c",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? "G-1YB56SEJ6L",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics is optional and must not prevent the app from starting.
export const analyticsPromise = isSupported().then((supported) => {
  if (!supported) return null;
  return getAnalytics(app);
});
