import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAz2owdAAzlpz9NUkrAxGEM6-hEASq63Uk",
  authDomain: "backupdrive-2090d.firebaseapp.com",
  projectId: "backupdrive-2090d",
  storageBucket: "backupdrive-2090d.appspot.com",
  messagingSenderId: "506519128545",
  appId: "1:506519128545:web:f16f5bcca0da68480baaa0",
  measurementId: "G-FY8KBMM3M1",
});

export const firestore = app.firestore();

export const database = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  formatDoc: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
};
export const storage = app.storage();
export const auth = app.auth();
export default app;
