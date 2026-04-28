// src/firebase/firestore.js
import { db } from "./config";
import { doc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Function to create a user profile in the database
export const createUserProfile = async (userId, data) => {
  try {
    await setDoc(doc(db, "users", userId), {
      ...data,
      ecoPoints: 0,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error creating profile:", error);
  }
};

// Function to save a waste scan record
export const saveWasteScan = async (userId, wasteType, points) => {
  try {
    await addDoc(collection(db, "scans"), {
      userId,
      wasteType,
      pointsEarned: points,
      timestamp: serverTimestamp(),
    });
    alert("Scan saved to Firebase!");
  } catch (error) {
    console.error("Error saving scan:", error);
  }
};