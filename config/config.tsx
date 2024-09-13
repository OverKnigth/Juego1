import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage'; // Importa Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyClwjZxLs6bflIjxnXnPXwq7zEfDAN-_fA",
  authDomain: "galaxi-86d0d.firebaseapp.com",
  projectId: "galaxi-86d0d",
  storageBucket: "galaxi-86d0d.appspot.com",
  messagingSenderId: "406745054935",
  appId: "1:406745054935:web:6091d982869b558ecc7a92",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app); // Inicializa el storage

export { db, auth, storage }; // Exporta el storage
