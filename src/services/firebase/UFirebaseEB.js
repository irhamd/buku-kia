const { db } = require("./firebase");
import { collection, getDocs, addDoc, updateDoc, deleteDoc, onSnapshot, query, setDoc, doc, where, } from "firebase/firestore";
import { dataPegawai } from "services/Text/GlobalText";


export const EB = {
    root: 'pannic_user',
}

export const collectionEB = collection(db, EB.root);


// const usersCollectionRef = collection(db, "users");
// const createUser = async () => {
//   await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
// };


export const addToFirebase = async () => {

    var obj = {
        name: "Jaka Tingkir", phone: "+6285566332214", status: "rq",}
    await addDoc(collectionEB, obj);

};