import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAo5S7m5NbvLNyY5QCGr7YZLtazJkVaTtk",
  authDomain: "chatapp-28c45.firebaseapp.com",
  databaseURL: "https://chatapp-28c45-default-rtdb.firebaseio.com",
  projectId: "chatapp-28c45",
  storageBucket: "chatapp-28c45.appspot.com",
  messagingSenderId: "1091370399402",
  appId: "1:1091370399402:web:13027f1a923efaee8182d3",
  measurementId: "G-7GCNCZN3TG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(

    <App />
 
)
