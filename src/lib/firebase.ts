import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "shining-ring-jds98",
  appId: "1:112460493544:web:7275785fa7ea2c8b004f5d",
  apiKey: "AIzaSyB1CQsa9rK0lWt94frO-s_bh8BRox5kvhU",
  authDomain: "shining-ring-jds98.firebaseapp.com",
  storageBucket: "shining-ring-jds98.firebasestorage.app",
  messagingSenderId: "112460493544"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-231d599e-461b-438b-bc7d-84a80622287e");
