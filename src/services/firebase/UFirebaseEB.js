const { db } = require("./firebase");
import { collection, getDocs, addDoc, updateDoc, deleteDoc, onSnapshot, query, setDoc, doc, where, } from "firebase/firestore";
import { dataPegawai } from "services/Text/GlobalText";


export const EB = {
    root: 'pannic_user',
}

export const collectionEB = collection(db, EB.root);