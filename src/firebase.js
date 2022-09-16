// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDME1quSguGRbwUEA-jC0gGgYj7Lu7E6G0",
  authDomain: "chat-a1de9.firebaseapp.com",
  projectId: "chat-a1de9",
  storageBucket: "chat-a1de9.appspot.com",
  messagingSenderId: "439754018498",
  appId: "1:439754018498:web:ebae6379977637658cb55b",
  measurementId: "G-1LZ9NDW1B9"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
