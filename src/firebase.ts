import  { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBdnGQaPIUvfg8_4OiWBQJSDxdZe03IAjE",
  authDomain: "tic-tac-toe-pvp-demo.firebaseapp.com",
  projectId: "tic-tac-toe-pvp-demo",
  storageBucket: "tic-tac-toe-pvp-demo.appspot.com",
  messagingSenderId: "423697050153",
  appId: "1:423697050153:web:e8d89de31d15c8cef45e80"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
 