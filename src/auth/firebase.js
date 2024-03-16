import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
//* https://firebase.google.com/docs/auth/web/start
//* https://console.firebase.google.com/ => project settings
//! firebase console settings bölümünden firebaseconfig ayarlarını al

const firebaseConfig = {
  apiKey: "AIzaSyBbKGxnT4Xp-FY_m3Ax5o5Yg0qAJK_sPh8",
  authDomain: "movie-app-f1165.firebaseapp.com",
  projectId: "movie-app-f1165",
  storageBucket: "movie-app-f1165.appspot.com",
  messagingSenderId: "292941928619",
  appId: "1:292941928619:web:65f9c1cc0a2bd4a1927fee",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
