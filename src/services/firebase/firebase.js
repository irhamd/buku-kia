
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyCvdz61OPlguHB_U5oTSMqC6wIBP82pcDU",
    authDomain: "androidwebapp-70b87.firebaseapp.com",
    databaseURL: "https://androidwebapp-70b87.firebaseio.com",
    projectId: "androidwebapp-70b87",
    storageBucket: "androidwebapp-70b87.appspot.com",
    messagingSenderId: "341844399322",
    appId: "1:341844399322:web:6627b0086dc94b487641e3"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);