import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyB7c23HokEYKt5hyXt9nH2_Ojhw7hWuU9A',
  authDomain: 'gymmi-a0438.firebaseapp.com',
  projectId: 'gymmi-a0438',
  storageBucket: 'gymmi-a0438.appspot.com',
  messagingSenderId: '953459196581',
  appId: '1:953459196581:web:55732bc8a7e2a94e85834c',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
