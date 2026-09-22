import {
  onAuthStateChanged,
  signInAnonymously,
  type User,
} from "firebase/auth";
import { auth } from "./config";
import { createUserProfile } from "./firestore";

export const ensureAuthenticatedUser = async (): Promise<User> => {
  const user = auth.currentUser ?? (await signInAnonymously(auth)).user;

  await createUserProfile(user.uid, {
    name: user.displayName ?? "Eco Warrior",
    email: user.email ?? null,
  });

  return user;
};

export const subscribeToAuth = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);
