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



function TestMaps() {



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

    const usersCollectionRef = collection(db, "position");

    const posRef = useRef(null)

    const gotoLocation = () => {
        try {
            map.flyTo(position, 13)
        } catch (error) {
        }
    }



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
        zoom: 13
    }

    const getLocation = async () => {


        const data = await getDocs(usersCollectionRef);
        let datapos = data.docs.map((doc) => ({ ...doc.data() }))
        let pos = datapos[0].position

        // console.log(pos._lat)

        let currPos = [pos._lat, pos._long]

        // setposition(currPos)
        posRef.current.click()

    };


    useEffect(() => {
        // onSnapshot(
        //     collection(db, "position"),
        //     (snapshot) => {
        //         getLocation()
        //         // gotoLocation()
        //     })
        // console.log(map)
    }, [])

    return (
        <div>
            <div style={{ position: "absolute", zIndex: 1000, width: "200px", right: "10px", top: "5px" }}>
                <Collapse ghost style={{ height: "5px" }} defaultActiveKey={['1']}>
                    <Panel header="Reminder" key="1">

                        <div className="blink-bg tengah" style={{ padding: "15px" }}>
                            <_Label label="Pasien" />
                            <b> <h4> SITI ROZAKOH</h4> </b>
                            <p style={{ marginTop: "-10px" }}> <b> <h3>0878645996</h3> </b> </p>
                            <CounterTime />
                            <_Row>
                                <_Button sm={5} color="green" style={{ marginTop: "3px" }} label="Proses" />
                                <_Button sm={5} color="orange" style={{ marginTop: "3px" }} label="Abaikan" />
                            </_Row>
                        </div>
                    </Panel>
                </Collapse>
            </div>

            <MapContainer whenCreated={setMap} className="map" center={position} zoom={state.zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={grenIcon}>
                    <Popup>
                        SITI ROZAKOH
                    </Popup>
                </Marker>

            </MapContainer>

            <button type="button" ref={posRef} style={{ zIndex: 4000 }} onClick={gotoLocation}> Gooo </button>

        </div>
    )
}

export default TestMaps
