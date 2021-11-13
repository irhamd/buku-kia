const { db } = require("./firebase");
import { collection, getDocs, addDoc, updateDoc, deleteDoc, onSnapshot, query, setDoc, doc, where, } from "firebase/firestore";
import { dataPegawai } from "services/Text/GlobalText";




export const F = {
    root: 'buku-kia',
    app: "app",
    service: "service",
    faskes: dataPegawai.kodefirebase ? dataPegawai.kodefirebase : "puskes"

}

export const fireCollectiom = collection(db, F.root, F.app, F.faskes);


// export const fireDoc = doc(db, dbname, id);


// const fireCollectiom = collection(db, dbname , "app",faskes);



export const updateFirebase = async () => {
    const cityRef = doc(db, "service", dataPegawai.kodefirebase);
    setDoc(cityRef, { rand: Math.random() }, { merge: true });

    // await addDoc(fireCollectiom, { name: newName, age: Number(newAge), isrujuk: true });
};