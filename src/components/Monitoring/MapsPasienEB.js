import React, { createRef, useEffect, useRef, useState } from 'react'
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, onSnapshot, query, doc, where, } from "firebase/firestore";

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
import { Collapse } from 'antd';
import { _Label } from 'services/Forms/Forms';
import { _Row } from 'services/Forms/LayoutBootstrap';
import { CounterTime } from 'services/Forms/FormsAdd';
import { collectionEB } from 'services/firebase/UFirebaseEB';
import { useSuara } from 'services/Sound/UseSuara';
import sirine from "./../../assets/sound/sirine1.m4a"
import { PhoneOutlined } from '@material-ui/icons';
import { DownloadOutlined, EnvironmentOutlined, LoginOutlined } from '@ant-design/icons';
import { _Col } from 'services/Forms/LayoutBootstrap';
import _Api from 'services/Api/_Api';



function MapsPasienEB(pr) {

    const [pasienEmer, setPasienEmer] = useState([]);
    // const [playing, toggle] = useSuara(true);


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
    const [position, setposition] = useState([-8.5841873, 116.1057478])

    const { Panel } = Collapse;


    const posRef = useRef(null)

    const gotoLocation = (loc) => {
        try {
            // console.log(`loc`, loc)
            var lok = [loc.lokasi._lat, loc.lokasi._long]
            console.log(`lok`, loc.lokasi)
            map.flyTo(loc ? lok : position, 18)
        } catch (error) {
        }
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



    const savePasienEB = (itm) => {
        console.log(`itm`, itm)

        var obj = {
            nama: "Mira",
            phone: "08748343",
            lokasiterakhir: JSON.stringify(itm.lokasi)
        }
        _Api.post(`eb-savePasienNewEB`, obj).then(res => {
            console.log(`res`, res)
        })
    }


    useEffect(() => {

        // audio.play()

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
            <Marker key={i} position={item.lokasi ? [item.lokasi._lat, item.lokasi._long] : position} icon={grenIcon}>
                <Popup>
                    {item.name} &nbsp; {item.phone}

                </Popup>
            </Marker>
        )
    })

    const renderPasienEBDet = pasienEmer.map((item, i) => {
        return (
            <div className="blink-bg tengah" style={{ padding: "5px" }}>
                <b> <h4> {item.name}</h4> </b>
                <p style={{ marginTop: "-8px", color: "white", fontWeight: "bolder", marginBottom: "-10px" }}> <b> <h5> {item.phone} </h5> </b> </p>
                <CounterTime />
                <_Row>
                    <_Col sm={2} />
                    <_Button sm={5} color="green" style={{ marginTop: "3px" }} label=" _" onClick={() => savePasienEB(item)} icon={<PhoneOutlined />} block />
                    {/* <_Button sm={5} color="#38c038" style={{ marginTop: "3px" }} label="IN" icon={<LoginOutlined />} block /> */}
                    <_Button sm={4} color="orange" style={{ marginTop: "3px" }} label=" _" icon={<EnvironmentOutlined />} block onClick={() => gotoLocation(item)} />
                </_Row>
            </div>
        )
    })

    return (
        <div>


            <div style={{ position: "absolute", zIndex: 1000, width: "200px", right: "10px", top: "5px" }}>
                <Collapse ghost style={{ height: "5px" }} defaultActiveKey={['1']}>
                    <Panel header="Pasien EB" key="1">
                        {renderPasienEBDet}
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
