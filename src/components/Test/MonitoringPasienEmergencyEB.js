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
import { Image, Modal, Spin, Tag, Button, Popconfirm, Popover } from 'antd';
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
import { updateFirebaseRS } from 'services/firebase/UFirebase';
import { cekRefresh } from 'services/Text/GlobalText';

import logo from "./../../assets/css/images/icon.png"
function MonitoringPasienEmergencyEB() {


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
            fontFamily: "Arial, Helvetica, sans-serif", paddingLeft: "0px"
        }
    }

    const gotoLokasi = (post) => {
        setShowpeta(true)
        setposition(post)
    }



    const updateDB = (id_pasienrujuk, sts, kodefirebase) => {
        setloading(true)
        setidd(id_pasienrujuk)
        _Api.get(`updateStatusPasienRujuk/${id_pasienrujuk}/${sts} `).then(res => {
            if (res.data.sts == 1) {
                // _Swall.success("suksess ...")
                getUsers()
                updateFirebaseRS(kodefirebase)
            } else {
                _Swall.error("Gagal .")
            }
        }).catch(err => {
            _Swall.error("Gagal .Err")

        })
    }

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
        cekRefresh()

        onSnapshot(
            collection(db, F.service),
            (snapshot) => {
                getUsers()
            })




        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude + ', ' + position.coords.longitude);
        });

    }, []);

    const renderPasienEmer = pasienEmer.map((item) => {
        return (
            <_Col sm={2}>
                <div className="blink-bg" style={{ marginBottom: "5px", paddingTop: "10px" }}>
                    <_Row>
                        <_Col style={{ textAlign: "center" }}>
                            <Image className="kotakShadow" src={item.foto ? item.foto : src} height={100} style={{ borderRadius: " 20% 0%" }} />
                            <p style={styl.label}>  Nomor HP :  </p>
                            <Tag color="red"> <div style={{ fontSize: "25px", fontWeight: "bold", padding: "10px" }} > {item.nohp} </div> </Tag>
                            <CounterTime />
                            <p style={styl.label}> Nama Pasien : </p>
                            <div style={styl.caption}> {item.nama.substring(0, 15)}.</div>

                        </_Col>

                    </_Row>


                    <_Row>
                        <_Col sm={1} />
                        {/* <p> {JSON.stringify(item)} </p> */}
                        {item.status == "request" || !item.status ?
                            <_Button size="large" loading={item.id == idd ? true : false} icon={<PhoneOutlined />} sm={4} block color="green" onClick={() => {
                                updateDB(item.id, "konfirm", item.kodefirebase)
                            }} /> :
                            <_Button size="large" label="Commit" loading={item.id == idd ? true : false} icon={<SisternodeOutlined spin />} sm={4} block color="#17a2b8" onClick={() => {
                                updateDB(item.id, "commit", item.kodefirebase)
                            }} />
                        }

                        <Popconfirm
                            title="TOLAK PERMINTAAN EMERGENCY PASIEN !?"
                            onConfirm={() => {
                                updateDB(item.id, "ditolak", item.kodefirebase);
                            }}
                            okText="Ya, Tolak"
                            cancelText="Batal"
                        >
                            <_Button size="large" color="orange" loading={item.id == idd ? true : false} sm={2} block icon={<DislikeOutlined />}
                            />

                        </Popconfirm>


                        <_Button size="large" color="orangered" sm={1} icon={<EnvironmentOutlined />}
                            onClick={() => gotoLokasi([-8.600073, 116.114254])}
                        />
                    </_Row>
                    <br />


                </div>
            </_Col>

        );
    })

    return (
        <div>
            <div className="background3gradient">

                <div className="body">
                    <div style={{ width: "100%" }}>
                        <p style={{
                            fontWeight: "bolder", fontSize: "20px", padding: "5px",
                            borderColor: "orange", textAlign: "center", marginBottom: "0px"
                        }}>  Monitoring Emergency Button
                        </p>
                        <Image src={logo} preview={false} style={{ marginTop: "-40px", marginLeft: "700px" }} width={80} />
                        <p style={{
                            fontWeight: "bolder", fontSize: "30px", background: "#f29331",
                            marginTop: "-45px", textAlign: "center", fontFamily: "Arial, Helvetica, sans-serif"
                        }}> RSUD KOTA MATARAM </p>

                    </div>
                </div>

                <br />
                <div style={{ paddingLeft: "5px" }}>

                    <_Row>
                        {renderPasienEmer}

                    </_Row>

                </div>

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

export default MonitoringPasienEmergencyEB
