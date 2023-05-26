// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjvoHCTlP7pS_V1YL2uzn9DrynQSyzz8k",

  authDomain: "le-blog-23d29.firebaseapp.com",

  projectId: "le-blog-23d29",

  storageBucket: "le-blog-23d29.appspot.com",

  messagingSenderId: "197442820703",

  appId: "1:197442820703:web:be9e7ed18476fb05fad9ea"

  // apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  // authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_ID,
  // appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
//guardar imagenes
const storage = getStorage(app);

export { app, firestore }