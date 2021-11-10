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
import { Image, Modal, Spin, Tag } from 'antd';
import { _Col } from 'services/Forms/LayoutBootstrap';
import { HighlightOutlined, PhonelinkOutlined, PhoneOutlined } from '@material-ui/icons';
import { CounterTime } from 'services/Forms/FormsAdd';
import { DislikeOutlined, EnvironmentOutlined, FallOutlined, SisternodeOutlined, WhatsAppOutlined } from '@ant-design/icons';
import TrackLokasi from './TrackLokasi';

function MonitoringPasienEmergency() {


    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);
    const [position, setposition] = useState(null)
    const [showpeta, setShowpeta] = useState(false)


    const [pasienEmer, setPasienEmer] = useState([]);
    const dbname = "pasien"
    const usersCollectionRef = collection(db, dbname);

    const styl = {
        label: { fontWeight: "bold", marginBottom: "-2px", color: "orange", fontFamily: "Arial, Helvetica, sans-serif" },
        caption: {
            fontSize: "30px", fontWeight: "bold", color: "#fdebb5", marginBottom: "4px", lineHeight: "normal", width: "100%",
            fontFamily: "Arial, Helvetica, sans-serif", paddingLeft: "35px"
        }
    }

    const gotoLokasi = (post) => {
        setShowpeta(true)
        setposition(post)
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
        // dt.map((val, i) => {
        //     console.log(`rujukk`, val.isrujuk)

        // })
        // console.log("DTTTTT", dt)
        setPasienEmer(dt);
    };

    useEffect(async () => {
        onSnapshot(
            collection(db, dbname),
            where("isrujuk", "==", true),
            (snapshot) => {
                setPasienEmer([])
                getUsers()
            })


        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude + ', ' + position.coords.longitude);
        });

    }, []);

    const renderPasienEmer = pasienEmer.map((user) => {
        return (
            <div>

                <div className="blink-bg" style={{ marginBottom: "5px", padding: "10px" }}>
                    <_Row>
                        <_Col sm={3} style={{ textAlign: "center" }}>
                            <Image className="kotakShadow" src={user.foto ? user.foto : src} height={200} style={{ borderRadius: " 20% 0%" }} />
                            <p style={styl.label}>  Nomor yang bisa dihubungi  </p>

                            <h1 style={{ marginBottom: "-5px" }}> <b> {user.nohp} </b> </h1>
                            <CounterTime />
                            <p> Status :   <Tag color="red"> {user.status} </Tag> </p>

                        </_Col>
                        <_Col sm={8} style={{ background: "#352b1a38", borderRadius: "5px", padding: "10px" }}>
                            <p style={styl.label}> Nama Pasien : </p>
                            <p style={styl.caption}> {user.nama}</p>

                            {/* <p style={styl.label}> Nomor telpon yang bisa dihubungi : </p>
                        <p style={styl.caption}>  08785365511 </p> */}

                            <p style={styl.label}>  Faskes : </p>
                            <p style={styl.caption}>  {user.faskes} </p>

                            <p style={styl.label}>  Alamat : </p>
                            <p style={styl.caption}>  {user.alamat}  </p>
                        </_Col>

                        {/* <h3 >Name: {user.name}</h3>
                <h3>Age: {user.age}</h3>
                <h3>Rujuk: {user.isrujuk && user.isrujuk.toString()}</h3> */}
                    </_Row>
                    <br />
                    <_Row>
                        <_Col sm={2} />

                        {user.status == "Request" ?

                            <_Button size="large" label="Terima" icon={<FallOutlined />} sm={4} block color="green" onClick={() => {
                                updateUser(user.id, user.age);
                            }} /> :

                            <_Button size="large" label="Commit" icon={<SisternodeOutlined />} sm={4} block color="#17a2b8" onClick={() => {
                                updateUser(user.id, user.age);
                            }} />


                        }


                        <_Button label="Abaikan" size="large" color="orange" sm={2} block icon={<DislikeOutlined />}
                            onClick={() => {
                                deleteUser(user.id);
                            }}
                        />
                        <_Button label="Track Lokasi" size="large" color="orangered" sm={2} block icon={<EnvironmentOutlined />}
                            onClick={() => gotoLokasi([-8.600073, 116.114254])}
                        />
                    </_Row>

                </div>



            </div>

        );
    })

    return (
        <div>
            <div className="App">

                {pasienEmer.length > 0 ? renderPasienEmer : <> <Spin /> <p style={{ paddingLeft: "30px" }}> Tidak ada pasien emergency .! </p> </>}
                <br />
            </div>

            {
                position &&
                <Modal
                    title="Modal 1000px width"
                    onCancel={() => setShowpeta(false)}
                    visible={showpeta}
                    width={1300}
                >
                    <TrackLokasi position={position} />
                </Modal>
            }
        </div>
    )
}

export default MonitoringPasienEmergency
