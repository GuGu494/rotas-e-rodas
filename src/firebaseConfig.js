import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBfZ4A_SUtyS_BQpaVMZLtn8PzUXfIZTwY",
  authDomain: "rodaserotas-40e2c.firebaseapp.com",
  projectId: "rodaserotas-40e2c",
  storageBucket: "rodaserotas-40e2c.firebasestorage.app",
  messagingSenderId: "966870471775",
  appId: "1:966870471775:web:a03440642dafef3748f7ea",
  measurementId: "G-V23KVSE0QY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
