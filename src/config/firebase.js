// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7OdZ9-xcMSAs6Iv4rCtQSirJItzKoI4Y",
    authDomain: "slide-71798.firebaseapp.com",
    projectId: "slide-71798",
    storageBucket: "slide-71798.firebasestorage.app",
    messagingSenderId: "287796352495",
    appId: "1:287796352495:web:1b09131fea435cb291d21a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };