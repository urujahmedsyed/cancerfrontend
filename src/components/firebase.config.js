// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAi_XqBUgRM_u7Xt4UoOrc7Pn6qTmJPfAA",
  authDomain: "cancercare-119bf.firebaseapp.com",
  projectId: "cancercare-119bf",
  storageBucket: "cancercare-119bf.appspot.com",
  messagingSenderId: "1028518269890",
  appId: "1:1028518269890:web:661d6fdcc6efd19b94bc5b",
  measurementId: "G-16P7TSHMMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);