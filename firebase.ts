// Import the functions you need from the SDKs you need

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore }  from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';


const firebaseConfig = {
  apiKey: "AIzaSyAnBNXrt_L6jz1v_63fWnwTXHlaVCoq3Mo",
  authDomain: "dropbox-clone-ea911.firebaseapp.com",
  projectId: "dropbox-clone-ea911",
  storageBucket: "dropbox-clone-ea911.appspot.com",
  messagingSenderId: "151810092540",
  appId: "1:151810092540:web:8bda7cf80a1871da899679"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };