// Import the functions you need from the SDKs you need
// import {
//   REACT_APP_FIREBASE_APP_ID,
//   REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   REACT_APP_FIREBASE_STORAGE_BUCKET,
//   REACT_APP_FIREBASE_PROJECT_ID,
//   REACT_APP_FIREBASE_MEASUREMENT_ID,
//   REACT_APP_FIREBASE_AUTH_DOMAIN,
//   REACT_APP_FIREBASE_API_KEY,
// } from '@env';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
console.log('Firebase Config:', firebaseConfig);

export const db = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
