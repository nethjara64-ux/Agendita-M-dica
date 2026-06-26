import { auth } from "./firebase.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export async function loginGoogle() {
  try {
    await signInWithPopup(auth, provider);
  } catch (e) {
    console.error("Login error:", e.code, e.message);
    if (e.code !== "auth/popup-closed-by-user") {
      alert("Error al iniciar sesión. Intenta de nuevo.");
    }
  }
}

export async function logout() {
  await signOut(auth);
}

export function onAuth(callback) {
  onAuthStateChanged(auth, callback);
}
