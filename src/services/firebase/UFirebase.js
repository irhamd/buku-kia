const { db } = require("./firebase");
import { collection, getDocs, addDoc, updateDoc, deleteDoc, onSnapshot, query, doc, where, } from "firebase/firestore";
import { dataPegawai } from "services/Text/GlobalText";




export const F = {
    root: 'buku-kia',
    app: "app",
    faskes: dataPegawai.kodefirebase ? dataPegawai.kodefirebase : "puskes"

}

export const fireCollectiom = collection(db, F.root, F.app, F.faskes);
// const fireCollectiom = collection(db, dbname , "app",faskes);

