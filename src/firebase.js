import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDd8PgVEZJFQjYRvt9WVay9HLeJF1_5M3s",
    authDomain: "filedrop-5b9d5.firebaseapp.com",
    projectId: "filedrop-5b9d5",
    storageBucket: "filedrop-5b9d5.appspot.com",
    messagingSenderId: "378577282657",
    appId: "1:378577282657:web:e298b8ba6ef97bc452ec20",
    measurementId: "G-17N010KE85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export default app;
