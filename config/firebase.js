import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
     apiKey: "AIzaSyAm5Piicz8ySqtyLgHf9uP3Gkujnw6tDJs",
  authDomain: "afrilearn-c0952.firebaseapp.com",
  projectId: "afrilearn-c0952",
  storageBucket: "afrilearn-c0952.firebasestorage.app",
  messagingSenderId: "158059318417",
  appId: "1:158059318417:web:60c37e5e2118914e128330",
  measurementId: "G-N8MDV46CS8"
};
 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

