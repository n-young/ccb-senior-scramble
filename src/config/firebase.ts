import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { doc, getFirestore, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove, query, collection, getDocs } from "firebase/firestore"; 

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const providers = { google: new GoogleAuthProvider() };

export async function setupUser(email: string, display_name: string) {
  await setDoc(doc(db, "users", email), {
    email: email,
    name: display_name,
    preferences: [],
  });
}

export async function getUser(email: string) {
  const user_ref = doc(db, "users", email);
  return getDoc(user_ref)
}

export async function addPreference(email: string, preference_email: string) {
  const user_ref = doc(db, "users", email);
  return await updateDoc(user_ref, {
    preferences: arrayUnion(preference_email)
  });
}

export async function removePreference(email: string, preference_email: string) {
  const user_ref = doc(db, "users", email);
  return await updateDoc(user_ref, {
    preferences: arrayRemove(preference_email)
  });
}

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

// TODO: Write tests
