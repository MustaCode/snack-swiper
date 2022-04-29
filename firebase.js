import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhl8od74njOdO37gJVBocg8iV4CMFxWtc",
  authDomain: "snackswiperauth.firebaseapp.com",
  projectId: "snackswiperauth",
  storageBucket: "snackswiperauth.appspot.com",
  messagingSenderId: "33962566222",
  appId: "1:33962566222:web:b3832a009620b3d35e591f"
};

// if (firebase.getApps.length === 0) {
//     firebase.initializeApp(firebaseConfig)
// }

const app = initializeApp(firebaseConfig);

// export const db = getDatabase(app)
export const db = getFirestore(app)