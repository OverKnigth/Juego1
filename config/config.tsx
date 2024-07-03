// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDExPOU41qzJlRuqpUoii_v6YdBH5SdXxI",
  authDomain: "prueba-1c17e.firebaseapp.com",
  projectId: "prueba-1c17e",
  storageBucket: "prueba-1c17e.appspot.com",
  messagingSenderId: "266323672085",
  appId: "1:266323672085:web:af2bc709f4f9429654e21c"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export {db,auth};
