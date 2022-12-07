import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { doc, getFirestore, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove, query, collection, getDocs } from "firebase/firestore"; 
import { User, Preference, Flag } from "./types"

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const providers = { google: new GoogleAuthProvider() };

// ========================================================
// Users
// ========================================================

export function setUser(user: User) {
  setDoc(doc(db, "users", user.email!), user, { merge: true });
}

export async function getUser(email: string): Promise<User> {
  const user_ref = doc(db, "users", email);
  const user_doc = await getDoc(user_ref)
  return {...user_doc.data()} as User
}

// ========================================================
// Preferences
// ========================================================

export async function addPreference(email: string, preference: Preference) {
  const user_ref = doc(db, "users", email);
  await updateDoc(user_ref, {
    preferences: arrayUnion(preference)
  });
}

export async function removePreference(email: string, preference: Preference) {
  const user_ref = doc(db, "users", email);
  await updateDoc(user_ref, {
    preferences: arrayRemove(preference)
  });
}

// ========================================================
// Matches
// ========================================================

export async function makeMatches() {
  const users_coll = collection(db, "users")
  const q = query(users_coll)
  const snapshot = await getDocs(q)
  const preferences: { [key: string]: any } = {}
  snapshot.forEach((doc: any) => {
    const data = doc.data()
    preferences[data.email] = data.preferences
  })
  return makeMatchesAlgorithm(preferences)
}

function makeMatchesAlgorithm(preferences: { [key: string]: any }) {
  const users = Object.keys(preferences)
  const results: { [key: string]: any } = {}
  for (const user of users) {
    results[user] = preferences[user].filter((pref: string) => preferences[pref].contains(user));
  }
  return results
}

// ========================================================
// Flags
// ========================================================

export async function setFlag(flag: Flag, value: boolean) {
  await setDoc(doc(db, "flags", flag), {value});
}

export async function getFlag(flag: Flag): Promise<boolean> {
  const flag_ref = doc(db, "flags", flag);
  const flag_doc = await getDoc(flag_ref)
  return flag_doc.data()!.value
}

// TODO: Write tests
