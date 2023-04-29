// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from 'firebase/auth';
// Функція для підключення бази даних у проект
import { getFirestore } from 'firebase/firestore';
// Функція для підключення сховища файлів в проект
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDZv5oRvEPu678dmJ5ivqwsMdEhz12OZ9I',
  authDomain: 'rn-social-386e6.firebaseapp.com',
  projectId: 'rn-social-386e6',
  storageBucket: 'rn-social-386e6.appspot.com',
  messagingSenderId: '1087265020146',
  appId: '1:1087265020146:web:dac14b305a1e93439a586b',
  measurementId: 'G-Z5DVL8DG7B',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
