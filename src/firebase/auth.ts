import {
  onAuthStateChanged,
  signInAnonymously,
  type User,
} from "firebase/auth";
import { auth } from "./config";
import { createUserProfile } from "./firestore";

export const ensureAuthenticatedUser = async (): Promise<User> => {
  if (auth.currentUser) {
    await createUserProfile(auth.currentUser.uid, {
      email: auth.currentUser.email ?? null,
      displayName: auth.currentUser.displayName ?? "Eco Warrior",
    });
    return auth.currentUser;
  }

  const credential = await signInAnonymously(auth);
  await createUserProfile(credential.user.uid, {
    email: null,
    displayName: "Eco Warrior",
  });

  return credential.user;
};

export const subscribeToAuth = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);
