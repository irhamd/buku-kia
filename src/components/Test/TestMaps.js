import React from 'react'
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';

import leafGreen from '../../assets/css/images/marker-icon-2x.png';
import leafRed from '../../assets/css/images/marker-icon.png';
import leafOrange from '../../assets/css/images/marker-icon.png';
import leafShadow from '../../assets/css/images/marker-shadow.png';
import L from 'leaflet';
import { TileLayer, Marker, Popup, MapContainer } from 'react-leaflet';

function TestMaps() {



    const grenIcon = L.icon({
        iconUrl: leafGreen,
        shadowUrl: leafShadow,

        iconSize: [38, 50], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 50], // point of the icon which will correspond to marker's location
        shadowAnchor: [20, 62],  // the same for the shadow
        popupAnchor: [-3, -76]
    });



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
        zoom: 16
    }

    const position = [-8.600073, 116.114254];

    return (
        <div>
            <MapContainer className="map" center={position} zoom={state.zoom}>
                <TileLayer

                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={grenIcon}>
                    <Popup>
                        I am a green leaf
                    </Popup>
                </Marker>

            </MapContainer>
        </div>
    )
}

export default TestMaps
