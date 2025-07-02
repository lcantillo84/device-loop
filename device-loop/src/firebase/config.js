// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase config (paste the config you saved from Step 1)
const firebaseConfig = {
    apiKey: "AIzaSyAhkLnk83XQvXDb5KpqcoKudvoMippOqAk",
    authDomain: "deviceloop0516.firebaseapp.com",
    projectId: "deviceloop0516",
    storageBucket: "deviceloop0516.firebasestorage.app",
    messagingSenderId: "145286824919",
    appId: "1:145286824919:web:6fc6a2a0fb10e6c8b00192",
    measurementId: "G-T1PYK3RNPR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;