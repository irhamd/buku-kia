import React, { useState, useEffect } from 'react'
// import { db } from "./firebase-config";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, onSnapshot, query, doc, where, } from "firebase/firestore";
import { db } from 'services/firebase/firebase';
import { _Swall } from 'services/Toastr/Notify/_Toastr';
import { Detector, Offline, Online } from 'react-detect-offline';
import Cookies from 'js-cookie';
import Countdown from 'react-countdown';
import { _Button } from 'services/Forms/Forms';
import { _Row } from 'services/Forms/LayoutBootstrap';
import src from "assets/img/no_image.jpg"
import { Image } from 'antd';
import { _Col } from 'services/Forms/LayoutBootstrap';
import { PhoneOutlined } from '@material-ui/icons';
import { CounterTime } from 'services/Forms/FormsAdd';
import { DislikeOutlined, WhatsAppOutlined } from '@ant-design/icons';

function TestFirebase() {


    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);

    const [users, setUsers] = useState([]);
    const dbname = "users"
    const usersCollectionRef = collection(db, dbname);

    const styl = {
        label: { fontWeight: "bold", marginBottom: "-2px", color: "orange", fontFamily: "Arial, Helvetica, sans-serif" },
        caption: {
            fontSize: "30px", fontWeight: "bold", color: "#fdebb5", marginBottom: "4px", lineHeight: "normal", width: "100%",
            fontFamily: "Arial, Helvetica, sans-serif", paddingLeft: "35px"
        }
    }



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
                <p>
                    <Countdown date={Date.now() + 10000} />,
                </p>
                {/* <input
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
                <br />   <br /> */}


                {/* <Detector
                    render={({ online }) => (
                        <div className={online ? "normal" : "warning"}>
                            Koneksi Internet :  {online ? "online" : "offline"}
                        </div>
                    )}
                /> */}


                {users.map((user) => {
                    return (
                        <div>

                            <div className="blink-bg" style={{ marginBottom: "5px", padding: "10px" }}>
                                <_Row>
                                    <_Col sm={3} style={{ textAlign: "center" }}>
                                        <Image src={src} width={200} style={{ borderRadius: " 50%" }} />
                                        <p style={styl.label}>  Nomor yang bisa dihubungi  </p>

                                        <h1 style={{ marginBottom: "-5px" }}> <b> 0878685898 </b> </h1>
                                        <CounterTime />

                                    </_Col>
                                    <_Col sm={8} style={{ background: "#352b1a38", borderRadius: "5px", padding: "10px" }}>
                                        <p style={styl.label}> Nama Pasien : </p>
                                        <p style={styl.caption}> ZAHRA ALFA BETA DELTA </p>

                                        {/* <p style={styl.label}> Nomor telpon yang bisa dihubungi : </p>
                                    <p style={styl.caption}>  08785365511 </p> */}

                                        <p style={styl.label}>  Faskes : </p>
                                        <p style={styl.caption}>  Puskesmas Dasan Agung </p>

                                        <p style={styl.label}>  Alamat : </p>
                                        <p style={styl.caption}>  Jln. Mana saja Mana saja Mana saja Mana saja Mana saja Mana saja Mana saja Mana saja Mana saja Mana saja  </p>
                                    </_Col>

                                    {/* <h3 >Name: {user.name}</h3>
                            <h3>Age: {user.age}</h3>
                            <h3>Rujuk: {user.isrujuk && user.isrujuk.toString()}</h3> */}
                                </_Row>
                                <br />
                                <_Row>
                                    <_Col sm={2} />
                                    <_Button size="large" label="Terima" icon={<WhatsAppOutlined />} sm={4} block color="green" onClick={() => {
                                        updateUser(user.id, user.age);
                                    }}
                                    />
                                    <_Button label="Abaikan" size="large" color="orange" sm={3} block icon={<DislikeOutlined />}
                                        onClick={() => {
                                            deleteUser(user.id);
                                        }}
                                    />
                                </_Row>

                            </div>



                        </div>

                    );
                })}
            </div>
        </div>
    )
}

export default TestFirebase
