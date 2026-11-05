import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD6FhOZtNifzfKHl3bpFqeFJZuBg6vMit4",
  authDomain: "chapter1-menu.firebaseapp.com",
  databaseURL: "https://chapter1-menu-default-rtdb.firebaseio.com",
  projectId: "chapter1-menu",
  storageBucket: "chapter1-menu.firebasestorage.app",
  messagingSenderId: "45592120981",
  appId: "1:45592120981:web:f7081abb7d2b996941959c"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
