import React, { createRef, useEffect, useRef, useState } from 'react'
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';
import { collection, getDocs, collectionGroup, updateDoc, deleteDoc, onSnapshot, query, doc, where, } from "firebase/firestore";

// import leafGreen from '../../assets/css/images/marker-icon-2x.png';
import leafGreen from '../../assets/css/images/icon.gif';
import leafRed from '../../assets/css/images/marker-icon.png';
import leafOrange from '../../assets/css/images/marker-icon.png';
import leafShadow from '../../assets/css/images/marker-shadow.png';
import L, { marker } from 'leaflet';
import { TileLayer, Popup, MapContainer, Marker } from 'react-leaflet';
import { _Button } from 'services/Forms/Forms';
import { db } from 'services/firebase/firebase';
// import Marker from 'react-leaflet-animated-marker';
import { Avatar, Collapse } from 'antd';
import { _Label } from 'services/Forms/Forms';
import { _Row } from 'services/Forms/LayoutBootstrap';
import { CounterTime } from 'services/Forms/FormsAdd';
import { collectionEB } from 'services/firebase/UFirebaseEB';
import { useSuara } from 'services/Sound/UseSuara';
import sirine from "./../../assets/sound/sirine1.m4a"
import { PhoneOutlined } from '@material-ui/icons';
import { DownloadOutlined, EnvironmentOutlined, LoadingOutlined, LoginOutlined } from '@ant-design/icons';
import { _Col } from 'services/Forms/LayoutBootstrap';
import _Api from 'services/Api/_Api';



function MapsPasienEB(pr) {

    const [pasienEmer, setPasienEmer] = useState([]);
    // const [playing, toggle] = useSuara(true);
    const [idd, setidd] = useState(null)


    const grenIcon = L.icon({
        iconUrl: leafGreen,
        shadowUrl: leafShadow,
        className: 'blinking',
        iconSize: [70, 70], // size of the icon
        shadowSize: [100, 80], // size of the shadow
        iconAnchor: [22, 50], // point of the icon which will correspond to marker's location
        shadowAnchor: [20, 62],  // the same for the shadow
        popupAnchor: [-3, -76]
    });

    // L.DomUtil.addClass(marker._icon, 'blinking');





    const [map, setMap] = useState(null)
    // const [position, setposition] = useState([-8.600073, 116.114254])
    const [position, setposition] = useState([-8.5996529, 116.1137956])

    const { Panel } = Collapse;


    const posRef = useRef(null)

    const gotoLocation = (loc) => {

        // console.log(`loc`, loc)
        var lok = [loc.location._lat, loc.location._long]
        // console.log(`lok`, loc.location)
        // console.log(`lok`, loc)
        map.flyTo(loc ? lok : position, 18)

    }

    let audio = new Audio(sirine)
    audio.loop = true;


    const state = {
        greenIcon: {
            lat: 35.787449,
            lng: -78.6438197,
        },
        redIcon: {
            lat: 35.774416,
            lng: -78.633271,
        },
        orangeIcon: {
            lat: 35.772790,
            lng: -78.652305,
        },
        zoom: 11
    }


    const getdatapasienEB = async () => {
        const data = await getDocs(collectionEB);
        var arr = data.docs.map((doc) => ({ ...doc.data(), uid: doc.id }))

        if (arr.length > 0) {
            // audio.play()
            console.log(`ddd`)
        }
        else {
            audio.currentTime = 0
            audio.pause()
        }

        setPasienEmer(arr);

        // console.log(`object`, data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    const deleteDataFirebase = async (id) => {
        const userDoc = doc(db, "pannic_user", id);
        await deleteDoc(userDoc);
    };


    const savePasienEB = (itm) => {
        // console.log(`itm`, itm)
        setidd(itm.uid)
        var obj = {
            nama: itm.name,
            phone: itm.phone,
            lokasiterakhir: JSON.stringify(itm.location)
        }
        _Api.post(`eb-savePasienNewEB`, obj).then(res => {
            // console.log(`res`, res)
            if (res.data.sts == 1) {
                deleteDataFirebase(itm.uid)

            }


        })
    }


    useEffect(() => {


        onSnapshot(
            collection(db, "pannic_user"),
            (snapshot) => {
                getdatapasienEB()
                // audio.play()
                // console.log(`audio`, audio.currentTime)
            })



    }, [])

    const renderPasienEB = pasienEmer.map((item, i) => {
        return (
            <Marker key={i} position={item.location ? [item.location._lat, item.location._long] : position} icon={grenIcon}>
                <Popup>
                   <h1> {item.name} &nbsp; {item.phone} </h1>
                </Popup>
            </Marker>
        )
    })

    const renderPasienEBDet = pasienEmer.map((item, i) => {
        return (
            <div className="blink-bg tengah" style={{ padding: "5px", marginBottom: "3px" }}>
                <b> <h4 style={{ color: "yellow" }}> {item.name && item.name.toUpperCase()}</h4> </b>
                <p style={{ marginTop: "-8px", color: "yellow", fontWeight: "bolder", marginBottom: "-5px", fontSize: "20px" }}> <b>{item.phone}  </b> </p>
                <CounterTime />
                <_Row>
                    <_Col sm={2} />
                    <_Button sm={5} color="green" loading={item.uid == idd ? true : false} style={{ marginTop: "3px" }} label=" _" onClick={() => savePasienEB(item)} icon={<PhoneOutlined />} block />
                    {/* <_Button sm={5} color="#38c038" style={{ marginTop: "3px" }} label="IN" icon={<LoginOutlined />} block /> */}
                    <_Button sm={4} color="orange" style={{ marginTop: "3px" }} label=" _" icon={<EnvironmentOutlined />} block onClick={() => gotoLocation(item)} />
                </_Row>
            </div>
        )
    })

    return (
        <div>

            <div style={{ position: "absolute", zIndex: 1000, width: "200px", right: "20px", top: "0px" }}>
                <Collapse ghost style={{ height: "5px" }} defaultActiveKey={['1']}>
                    <Panel header={"Pasien Emergency"} key="1">
                        {
                            pasienEmer.length <= 0 &&
                            <div className="tengah" style={{ padding: "5px" }}>
                                <b> <LoadingOutlined size="large" style={{ fontSize: "80px" }} spin /> <h4> Waiting ... </h4> </b>
                            </div>
                        }
                        <h1 style={{ background: "red", textAlign: "center", borderRadius: " 20%", margin: "0px 60px 0px 60px" }}>
                            <b> {pasienEmer.length} </b> </h1>
                        <small> Menunggu </small>
                        {/* <Avatar style={{ fontSize :"20px", background :"red",  verticalAlign: 'middle' }} size="large">
                            <h1> {45} </h1>
                        </Avatar> */}
                        <div style={{ height: "700px", overflow: "auto" }}>
                            {renderPasienEBDet}
                        </div>
                    </Panel>

                </Collapse>

            </div>



            <MapContainer whenCreated={setMap} className="map" center={[-8.632888, 116.237084]} zoom={state.zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {renderPasienEB}
            </MapContainer>

            {/* <button type="button" ref={posRef} style={{ zIndex: 4000 }} onClick={gotoLocation}> Gooo </button> */}

        </div>
    )
}

export default MapsPasienEB