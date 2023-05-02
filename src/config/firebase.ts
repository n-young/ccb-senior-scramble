import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { doc, getFirestore, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove, query, collection, getDocs } from "firebase/firestore"; 
import { User, Flag } from "./types"

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

export function updateUser(user: User) {
  updateDoc(doc(db, "users", user.email!), user);
}

export async function getUser(email: string): Promise<User> {
  const user_ref = doc(db, "users", email);
  const user_doc = await getDoc(user_ref);
  return {...user_doc.data()} as User;
}

export async function getUsers(): Promise<User[]> {
  const users_coll = collection(db, "users");
  const q = query(users_coll);
  const snapshot = await getDocs(q);
  const preferences: User[] = [];
  snapshot.forEach((doc: any) => {
    const data = doc.data() as User;
    preferences.push({
      email: data.email,
      display_name: data.display_name,
    })
  });
  return preferences
}

// ========================================================
// Preferences
// ========================================================

export async function addPreference(email: string, preference: string) {
  const user_ref = doc(db, "users", email);
  await updateDoc(user_ref, {
    preferences: arrayUnion(preference)
  });
}

export async function removePreference(email: string, preference: string) {
  const user_ref = doc(db, "users", email);
  await updateDoc(user_ref, {
    preferences: arrayRemove(preference)
  });
}

// ========================================================
// Matches
// ========================================================

export async function makeMatches() {
  const users_coll = collection(db, "users");
  const q = query(users_coll);
  const snapshot = await getDocs(q);
  const preferences: { [key: string]: string[] } = {};
  const full_senders: string[] = []
  snapshot.forEach((doc) => {
    const data = doc.data();
    preferences[data.email] = data.preferences;
    if (data.full_sending)
      full_senders.push(data.email)
  });
  const res = makeMatchesAlgorithm(full_senders, preferences);
  console.log(res)
  return res;
}

function makeMatchesAlgorithm(full_senders: string[], preferences: { [key: string]: string[] }): { [key: string]: string[] } {
  const users = Object.keys(preferences);
  const results: { [key: string]: string[] } = {};
  // Add users that match mutually
  for (const user of users) {
    results[user] = preferences[user].filter((pref: string) => {
      const matchingPref = preferences[pref].filter(p => p === user)
      return matchingPref.length > 0;
    });
  }
  // Add users that mutually full send
  for (const user of full_senders) {
    preferences[user].filter((pref: string) => full_senders.includes(pref) && preferences[pref].filter(p => p === user).length === 0)
      .forEach((pref: string) => results[pref!].push(user))
  }
  return results;
}

// ========================================================
// Flags
// ========================================================

export async function setFlag(flag: Flag, value: boolean) {
  await setDoc(doc(db, "flags", flag), {value});
}

export async function getFlag(flag: Flag): Promise<boolean> {
  const flag_ref = doc(db, "flags", flag);
  const flag_doc = await getDoc(flag_ref);
  return flag_doc.data()!.value;
}
