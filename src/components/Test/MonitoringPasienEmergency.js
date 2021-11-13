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
import { Image, Modal, Spin, Tag, Button, Popconfirm } from 'antd';
import { _Col } from 'services/Forms/LayoutBootstrap';
import { HighlightOutlined, PhonelinkOutlined, PhoneOutlined } from '@material-ui/icons';
import { CounterTime } from 'services/Forms/FormsAdd';
import { DislikeOutlined, EnvironmentOutlined, FallOutlined, QuestionCircleOutlined, SisternodeOutlined, WhatsAppOutlined } from '@ant-design/icons';
import TrackLokasi from './TrackLokasi';
import _Api from 'services/Api/_Api';
import { fireCollectiom } from 'services/firebase/UFirebase';
import { F } from 'services/firebase/UFirebase';
import { updateFirebase } from 'services/firebase/UFirebase';
import $ from "jquery"

function MonitoringPasienEmergency() {


    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);
    const [position, setposition] = useState(null)
    const [showpeta, setShowpeta] = useState(false)
    const [loading, setloading] = useState(false)
    const [idd, setidd] = useState(null)


    const [pasienEmer, setPasienEmer] = useState([]);
    const dbname = "pasien"
    const usersCollectionRef = fireCollectiom;

    const styl = {
        label: { fontWeight: "bold", marginBottom: "-2px", color: "orange", fontFamily: "Arial, Helvetica, sans-serif" },
        caption: {
            fontSize: "20px", fontWeight: "bold", color: "#fdebb5", marginBottom: "4px", lineHeight: "normal", width: "100%",
            fontFamily: "Arial, Helvetica, sans-serif", paddingLeft: "35px"
        }
    }

    const gotoLokasi = (post) => {
        setShowpeta(true)
        setposition(post)
    }



    const updateDB = (id_pasienrujuk, sts) => {
        setloading(true)
        setidd(id_pasienrujuk)
        _Api.get(`updateStatusPasienRujuk/${id_pasienrujuk}/${sts} `).then(res => {
            if (res.data.sts == 1) {
                // _Swall.success("suksess ...")
                getUsers()
                updateFirebase()
            } else {
                _Swall.error("Gagal .")
            }
        }).catch(err => {
            _Swall.error("Gagal .Err")

        })
    }


    const deleteUser = async (id) => {
        const userDoc = doc(db, dbname, id);
        await deleteDoc(userDoc);
    };




    const getUsers = () => {
        // setloading(false)

        // const q = query(fireCollectiom,
        //     where("isrujuk", "==", true)
        // );
        // const querySnapshot = await getDocs(q);
        // let dt = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        var dt = []
        _Api.get(`getPasienRujukRS`).then(res => {
            dt = res.data.data
            setPasienEmer(dt);
            setloading(false)
            setidd(null)

            // console.log(`dt`, dt)
            if (dt.length > 0) {

            }
        })
    };

    useEffect(() => {
        onSnapshot(doc(db, F.service, F.faskes), (doc) => {
            // console.log("Current data 111: ", doc.data());
            getUsers()
        });


        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude + ', ' + position.coords.longitude);
        });

    }, []);

    const renderPasienEmer = pasienEmer.map((item) => {
        return (
            <div>

                <div className="blink-bg" style={{ marginBottom: "5px", padding: "10px" }}>
                    <_Row>
                        <_Col sm={3} style={{ textAlign: "center" }}>
                            <Image className="kotakShadow" src={item.foto ? item.foto : src} height={100} style={{ borderRadius: " 20% 0%" }} />
                            <p style={styl.label}>  Nomor yang bisa dihubungi  </p>
                            <Tag color="red"> <div style={{ fontSize: "30px", fontWeight: "bold", padding: "10px" }} > {item.nohp} </div> </Tag>
                            <CounterTime />
                            <p> status:: <Tag color="red"> {item.status} </Tag> </p>
                            <p> <_Button icon={<QuestionCircleOutlined />} label="Alasan" /> </p>

                        </_Col>
                        <_Col sm={8} style={{ background: "#352b1a38", borderRadius: "5px", padding: "10px" }}>
                            <p style={styl.label}> Nama Pasien : </p>
                            <p style={styl.caption}> {item.nama}</p>

                            {/* <p style={styl.label}> Nomor telpon yang bisa dihubungi : </p>
                        <p style={styl.caption}>  08785365511 </p> */}

                            <p style={styl.label}>  Faskes : </p>
                            <p style={styl.caption}>  {item.faskes} </p>

                            <p style={styl.label}>  Alamat : </p>
                            <p style={styl.caption}>  {item.alamat}  </p>
                            <hr />
                            <_Row>
                                <_Col sm={1} />
                                {/* <p> {JSON.stringify(item)} </p> */}
                                {item.status == "request" || !item.status ?
                                    <_Button size="large" label="Konfirmasi" loading={item.id == idd ? true : false} icon={<FallOutlined />} sm={4} block color="green" onClick={() => {
                                        updateDB(item.id, "konfirm")
                                    }} /> :
                                    <_Button size="large" label="Commit" loading={item.id == idd ? true : false} icon={<SisternodeOutlined />} sm={4} block color="#17a2b8" onClick={() => {
                                        updateDB(item.id, "commit")
                                    }} />
                                }

                                <Popconfirm
                                    title="Are you sure to delete this task?"
                                    onConfirm={() => {
                                        updateDB(item.id, "ditolak");
                                    }}
                                    okText="Ya, Tolak"
                                    cancelText="Batal"
                                >
                                    <_Button label="Tolak" size="large" color="orange" loading={item.id == idd ? true : false} sm={3} block icon={<DislikeOutlined />}

                                    />
                                </Popconfirm>


                                <_Button label="Track Lokasi" size="large" color="orangered" sm={3} block icon={<EnvironmentOutlined />}
                                    onClick={() => gotoLokasi([-8.600073, 116.114254])}
                                />
                            </_Row>
                        </_Col>

                        {/* <h3 >Name: {item.name}</h3>
                <h3>Age: {item.age}</h3>
                <h3>Rujuk: {item.isrujuk && item.isrujuk.toString()}</h3> */}
                    </_Row>
                    <br />


                </div>



            </div>

        );
    })

    return (
        <div>
            <div className="App">
                {/* {renderPasienEmer} */}
                {pasienEmer.length > 0 ? renderPasienEmer : <> <Spin size="large" /> <p style={{ paddingLeft: "30px" }}> Belum ada pasien emergency .! </p> </>}
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
