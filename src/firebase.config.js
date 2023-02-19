import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCOKhVDinW8PNifH-KSGua07zaMG539CEU",
  authDomain: "food-delivery-d1cdc.firebaseapp.com",
  databaseURL: "https://food-delivery-d1cdc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "food-delivery-d1cdc",
  storageBucket: "food-delivery-d1cdc.appspot.com",
  messagingSenderId: "732703386061",
  appId: "1:732703386061:web:b6cabb152076a987013c84"
};

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
