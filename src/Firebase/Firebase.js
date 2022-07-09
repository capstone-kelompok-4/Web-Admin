// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlk5ADQTL9t529ddUx5v_71mHLmy3Xgp4",
  authDomain: "capstone-project-alterra.firebaseapp.com",
  projectId: "capstone-project-alterra",
  storageBucket: "capstone-project-alterra.appspot.com",
  messagingSenderId: "1047712642510",
  appId: "1:1047712642510:web:9009f00999c65dd7d8679f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://capstone-project-alterra.appspot.com")

export {storage};