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
import { Image, Modal, Spin, Tag, Button, Popconfirm, Popover, Drawer, Steps } from 'antd';
import { _Col } from 'services/Forms/LayoutBootstrap';
import { HighlightOutlined, PhonelinkOutlined, PhoneOutlined } from '@material-ui/icons';
import { CounterTime } from 'services/Forms/FormsAdd';
import { DislikeOutlined, EnvironmentOutlined, FallOutlined, LoadingOutlined, QuestionCircleOutlined, SisternodeOutlined, SmileOutlined, SolutionOutlined, UserOutlined, WhatsAppOutlined } from '@ant-design/icons';
import _Api from 'services/Api/_Api';
import { fireCollectiom } from 'services/firebase/UFirebase';
import { F } from 'services/firebase/UFirebase';
import { updateFirebase } from 'services/firebase/UFirebase';
import $ from "jquery"
import { updateFirebaseRS } from 'services/firebase/UFirebase';
import { cekRefresh } from 'services/Text/GlobalText';

import logo from "./../../assets/css/images/icon.png"
import MapsPasienEB from './MapsPasienEB';
import { useSuara } from 'services/Sound/UseSuara';
import { collectionEB } from 'services/firebase/UFirebaseEB';


function MonitoringPasienEB() {


    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);
    const [position, setposition] = useState(null)
    const [showpeta, setShowpeta] = useState(false)
    const [loading, setloading] = useState(false)
    const [idd, setidd] = useState(null)
    const [showMenu, setshowMenu] = useState(false)



    const [pasienEmer, setPasienEmer] = useState([]);
    const [pasienEB, setpasienEB] = useState([]);
    const dbname = "pasien"
    const usersCollectionRef = fireCollectiom;

    const { Step } = Steps;

    const gotoLokasi = (post) => {
        setShowpeta(true)
        setposition(post)
    }



    const updateDB = (id_pasienrujuk, sts, kodefirebase) => {
        // setloading(true)
        // setidd(id_pasienrujuk)
        // _Api.get(`updateStatusPasienRujuk/${id_pasienrujuk}/${sts} `).then(res => {
        //     if (res.data.sts == 1) {
        //         // _Swall.success("suksess ...")
        //         getUsers()
        //         updateFirebaseRS(kodefirebase)
        //     } else {
        //         _Swall.error("Gagal .")
        //     }
        // }).catch(err => {
        //     _Swall.error("Gagal .Err")

        // })
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


        onSnapshot(
            collection(db, F.service),
            (snapshot) => {
                // getUsers()
            }
        )




        // navigator.geolocation.getCurrentPosition(function (position) {
        //     console.log("Latitude is :", position.coords.latitude + ', ' + position.coords.longitude);
        // });

    }, []);

    const renderPasienEmer = pasienEmer.map((item) => {
        return (
            <_Col sm={2}>
                <div className="blink-bg" style={{ marginBottom: "5px", paddingTop: "10px" }}>


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
                    <_Row style={{ width: "100%" }}>



                        <_Col sm={4} style={{ marginLeft: "80px" }}>
                            <p style={{
                                fontWeight: "bolder", fontSize: "20px", padding: "5px",
                                borderColor: "rgb(236 88 14)", marginBottom: "0px"
                            }}>  Monitoring Emergency Button
                            </p>
                            <Image src={logo} preview={false}
                                onClick={() => setshowMenu(true)} style={{ marginTop: "-40px", marginLeft: "-70px" }} width={70} />
                            <p style={{
                                fontSize: "30px",
                                marginTop: "-45px", fontFamily: "BrothersCircus, Arial, serif"
                            }}> RSUD KOTA MATARAM </p>
                        </_Col>

                        <_Col sm={5}>
                            {/* <Steps style={{ background: "yellow" }} size="large">
                                <Step status="finish" title="83" description="Pasien Emergency" icon={<UserOutlined />} />
                                <Step status="finish" title="73" description="Commit" icon={<SolutionOutlined />} />
                                <Step status="process" title="Pay" icon={<LoadingOutlined />} />
                            </Steps> */}
                        </_Col>
                    </_Row>
                </div>


                <div style={{ paddingLeft: "5px" }} className="site-drawer-render-in-current-wrapper">

                    <Drawer
                        placement="left"
                        visible={showMenu}
                        onClose={() => setshowMenu(false)}
                        getContainer={false}
                        style={{ position: 'absolute' }}
                    >
                        <p>Some contents...</p>
                    </Drawer>
                    <br />

                    <MapsPasienEB />



                    {/* <_Row>
                        {renderPasienEmer}

                    </_Row> */}

                </div>

            </div>


        </div>
    )
}

export default MonitoringPasienEB
