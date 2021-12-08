import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAi-2YQQswZTrA9UTbDnpvVIppUpH2b28",
  authDomain: "compounder-0x0.firebaseapp.com",
  databaseURL: "https://compounder-0x0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "compounder-0x0",
  storageBucket: "compounder-0x0.appspot.com",
  messagingSenderId: "403789342989",
  appId: "1:403789342989:web:0a6bcf885e2ecb2cc9e844",
  measurementId: "${config.measurementId}",
};

initializeApp(firebaseConfig);


export const db = getFirestore();
