import React, { useState, useEffect } from 'react'
// import { db } from "./firebase-config";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, onSnapshot, query, doc, where, } from "firebase/firestore";
import { db } from 'services/firebase/firebase';
import { _Swall } from 'services/Toastr/Notify/_Toastr';
import { Detector, Offline, Online } from 'react-detect-offline';
import Cookies from 'js-cookie';
import Countdown from 'react-countdown';

function TestFirebase() {


    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);

    const [users, setUsers] = useState([]);
    const dbname = "users"
    const usersCollectionRef = collection(db, dbname);


    const createUser = async () => {
        await addDoc(usersCollectionRef, { name: newName, age: Number(newAge), isrujuk: true });
    };

    const updateUser = async (id, age) => {
        const userDoc = doc(db, dbname, id);
        const newFields = { age: age + 1 };
        await updateDoc(userDoc, newFields);
    };

    const deleteUser = async (id) => {
        const userDoc = doc(db, dbname, id);
        await deleteDoc(userDoc);
    };

    const tambahCook = () => {
        Cookies.set("bebass", "apapaa ajjaa")
    };
    const showCookies = () => {
        var aa = Cookies.get("bebass")

        console.log(aa)
    };

    const getUsers = async () => {
        const q = query(collection(db, dbname), where("isrujuk", "==", true));
        const querySnapshot = await getDocs(q);
        let dt = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        dt.map((val, i) => {
            console.log(`rujukk`, val.isrujuk)

        })
        // console.log(dt)
        setUsers(dt);
    };

    useEffect(async () => {
        onSnapshot(
            collection(db, dbname),
            where("isrujuk", "==", true),
            (snapshot) => {
                setUsers([])
                getUsers()
            })


        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude + ', ' + position.coords.longitude);
        });

    }, []);


    return (
        <div>
            <div className="App">
                <Countdown date={Date.now() + 10000} />,
                <input
                    placeholder="Name..."
                    onChange={(event) => {
                        setNewName(event.target.value);
                    }}
                />
                <input
                    type="number"
                    placeholder="Age..."
                    onChange={(event) => {
                        setNewAge(event.target.value);
                    }}
                />

                <button onClick={createUser}> Create User</button>
                <button onClick={tambahCook}> Add Coockies</button>
                <button onClick={showCookies}> Tampil</button>
                <br />   <br />


                <Detector
                    render={({ online }) => (
                        <div className={online ? "normal" : "warning"}>
                            Koneksi Internet :  {online ? "online" : "offline"}
                        </div>
                    )}
                />


                {users.map((user) => {
                    return (
                        <div className="blink-bg" style={{ marginBottom: "5px" }}>
                            <h1 >Name: {user.name}</h1>
                            <h1>Age: {user.age}</h1>
                            <h1>Rujuk: {user.isrujuk && user.isrujuk.toString()}</h1>
                            <button
                                onClick={() => {
                                    updateUser(user.id, user.age);
                                }}
                            >
                                Increase Age
                            </button>
                            <button
                                onClick={() => {
                                    deleteUser(user.id);
                                }}
                            >
                                Delete User
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default TestFirebase
