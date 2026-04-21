import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCyY_yUS3Hm1sFLn0PZJtMAujCZ3vfs1Kc",
    authDomain: "portfolio-81816.firebaseapp.com",
    projectId: "portfolio-81816",
    storageBucket: "portfolio-81816.firebasestorage.app",
    messagingSenderId: "518428478772",
    appId: "1:518428478772:web:2b5e2a41d981fe70cfe961",
    measurementId: "G-XPCWD131WR"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
