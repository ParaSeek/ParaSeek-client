import { nanoid } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, getFirestore, onSnapshot, setDoc, updateDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const firestore = getFirestore(app);
const provider = new GoogleAuthProvider();

// google Sign in
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (error) {
    console.error("Error during Google Sign-In:", error);
  }
};

//Notification send
export async function sendNotification(recipientId: string, title: string, message: string) {
  try {
    const notif =
    {
      title,
      message,
      read: false,
      recipient: recipientId,
      time: Date.now()
    }
    await setDoc(doc(firestore, "notifications", nanoid()), notif)
      .then(() => {
        console.log("Notification sent to user!")
      })
      .catch((error) => {
        console.error("Error sending notification to user!", error)
      })
  } catch (error) {
    console.error("Error Sending Notification:", error);
  }
}
