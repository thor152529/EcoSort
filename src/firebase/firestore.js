import {
  collection,
  doc,
  getDoc,
  increment,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config";

export const createUserProfile = async (userId, data = {}) => {
  const userRef = doc(db, "users", userId);
  const existing = await getDoc(userRef);

  if (existing.exists()) {
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
    return { ...existing.data(), ...data };
  }

  const profile = {
    ...data,
    ecoPoints: 0,
    totalScans: 0,
    role: "user",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(userRef, profile);
  return profile;
};

export const getUserProfile = async (userId) => {
  const snapshot = await getDoc(doc(db, "users", userId));
  return snapshot.exists() ? snapshot.data() : null;
};

export const saveWasteScan = async (
  userId,
  wasteType,
  points = 15,
  bin = "Blue Bin",
  confidence = 0.984
) => {
  if (!userId) throw new Error("No authenticated user.");

  const userRef = doc(db, "users", userId);
  const scanRef = doc(collection(db, "scans"));

  await runTransaction(db, async (transaction) => {
    const userSnapshot = await transaction.get(userRef);
    if (!userSnapshot.exists()) {
      throw new Error("User profile not found.");
    }

    transaction.set(scanRef, {
      userId,
      wasteType,
      bin,
      confidence,
      pointsEarned: points,
      timestamp: serverTimestamp(),
    });

    transaction.update(userRef, {
      ecoPoints: increment(points),
      totalScans: increment(1),
      updatedAt: serverTimestamp(),
    });
  });
};

export const createPickupRequest = async ({
  userId,
  itemType = "Other",
  day = "Wed",
  time = "10 AM",
}) => {
  if (!userId) throw new Error("No authenticated user.");

  return addDoc(collection(db, "pickupRequests"), {
    userId,
    itemType,
    day,
    time,
    status: "Pending",
    createdAt: serverTimestamp(),
  });
};
