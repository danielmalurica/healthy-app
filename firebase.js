import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBoBVWRhJItIcTblQSR-QwA6tnX8xEmwRQ",
    authDomain: "healty-app-b323c.firebaseapp.com",
    projectId: "healty-app-b323c",
    storageBucket: "healty-app-b323c.appspot.com",
    messagingSenderId: "347088149186",
    appId: "1:347088149186:web:6407d5e4552fc3e3d6f95b",
    measurementId: "G-F3ND4669QQ"
};


const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
