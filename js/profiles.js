import { db } from "./firebase.js";
import { collection, doc, setDoc, deleteDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

export async function saveProfile(uid, data, id = null) {
  const ref = id
    ? doc(db, "users", uid, "profiles", id)
    : doc(collection(db, "users", uid, "profiles"));
  await setDoc(ref, { ...data, updatedAt: Date.now() });
  return ref.id;
}

export async function deleteProfile(uid, id) {
  await deleteDoc(doc(db, "users", uid, "profiles", id));
}

export function subscribeProfiles(uid, callback) {
  return onSnapshot(collection(db, "users", uid, "profiles"), snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

export function calcAge(birthdate) {
  if (!birthdate) return "";
  const diff = Date.now() - new Date(birthdate).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}
