// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtcV-jNGXGnC-5b71lDssKakbS8WaMlWg",
  authDomain: "ahmd-8608c.firebaseapp.com",
  projectId: "ahmd-8608c",
  storageBucket: "ahmd-8608c.firebasestorage.app",
  messagingSenderId: "1062347061629",
  appId: "1:1062347061629:web:115f1c8daa81667e2e7414",
  measurementId: "G-DG67MCQWMW"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
