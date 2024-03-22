// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import 'firebase/firestore';



  const firebaseConfig = {
    apiKey: "AIzaSyD7fGliMTlTFDtAPTdC5j8we04XNhnjVzc",
    authDomain: "new-chatter-3cdbd.firebaseapp.com",
    projectId: "new-chatter-3cdbd",
    storageBucket: "new-chatter-3cdbd.appspot.com",
    messagingSenderId: "204485143368",
    appId: "1:204485143368:web:9e560c64408d597962617d",
    measurementId: "G-TJ0GGH0QYE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Auth =  getAuth(app);
export const Provider = new GoogleAuthProvider()
export const storage = getStorage(app);
export const db = getFirestore(app);
export const  googleSignin =async() => {
    return await signInWithPopup(Auth, Provider).then((result) => {
      console.log(result);
      }).catch((error) => {console.log(error)})}





      