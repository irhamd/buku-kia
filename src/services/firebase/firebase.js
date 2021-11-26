
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";


// firestore 
const firebaseConfigLama = {
    apiKey: "AIzaSyCvdz61OPlguHB_U5oTSMqC6wIBP82pcDU",
    authDomain: "androidwebapp-70b87.firebaseapp.com",
    databaseURL: "https://androidwebapp-70b87.firebaseio.com",
    projectId: "androidwebapp-70b87",
    storageBucket: "androidwebapp-70b87.appspot.com",
    messagingSenderId: "341844399322",
    appId: "1:341844399322:web:6627b0086dc94b487641e3"
};


const firebaseConfig = {
    apiKey: "AIzaSyDYeeHukPXj1PkznlEu_vugjJAXNW1lwVI",
    authDomain: "fir-phone-auth-59733.firebaseapp.com",
    projectId: "fir-phone-auth-59733",
    storageBucket: "fir-phone-auth-59733.appspot.com",
    messagingSenderId: "738801493999",
    appId: "1:738801493999:web:db5edca116f0d6d798781a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);