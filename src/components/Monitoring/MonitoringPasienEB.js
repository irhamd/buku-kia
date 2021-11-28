import React, { useState, useEffect } from 'react'
import { _Swall } from 'services/Toastr/Notify/_Toastr';
import { Detector, Offline, Online } from 'react-detect-offline';
import { _Button } from 'services/Forms/Forms';
import { _Row } from 'services/Forms/LayoutBootstrap';
import { Image, Modal, Menu, Tag, Button, Popconfirm, Popover, Drawer, Steps, Spin } from 'antd';
import { _Col } from 'services/Forms/LayoutBootstrap';
import _Api from 'services/Api/_Api';
import { cekRefresh } from 'services/Text/GlobalText';

import logo from "./../../assets/css/images/icon.png"
import ambulance from "./../../assets/css/images/ambulance.png"
import call from "./../../assets/css/images/call.png"
import siren from "./../../assets/css/images/siren.png"
import block from "./../../assets/css/images/block.png"
import stop from "./../../assets/css/images/stop.png"
import menu from "./../../assets/css/images/menu.png"
import MapsPasienEB from './MapsPasienEB';
import MenuUtama from './DataPasienEB/MenuUtama';
import { addToFirebase } from 'services/firebase/UFirebaseEB';
import RiwayatEmergencyButton from './DataPasienEB/RiwayatEmergencyButton';



function MonitoringPasienEB() {


    const [jumlahEB, setjumlahEB] = useState(0)
    const [showMenu, setshowMenu] = useState(false)
    const [datas, setdatas] = useState([])
    const [loading, setloading] = useState(false)
    const [ambul, setambul] = useState(0)
    const [pasienanulir, setpasienanulir] = useState(0)
    const [showDPEB, setshowDPEB] = useState(false)





    const getData = () => {
        setloading(true)
        _Api.get(`eb-getDataDashboard`).then(res => {
            setloading(false)
            setdatas(res.data.data)
            setambul(res.data.ambulance)
            setpasienanulir(res.data.pasienanulir)
        })
    };



    useEffect(() => {
        getData()
        // cekRefresh

    }, []);


    const style = {
        value: { fontFamily: "BrothersCircus, Arial, serif", position: "absolute", top: "-13px" },
        div: { background: "orange", padding: "10px", fontFamily: "BrothersCircus, Arial, serif" },
        small: { position: "absolute", top: "35px", left: "-43px" }
    }
    return (
        <div>
            <div className="background3gradient">

                <div className=" body">
                    <_Row style={{ width: "100%" }}>
                        <_Col sm={4} style={{ marginLeft: "80px" }}>
                            <p style={{
                                fontWeight: "bolder", fontSize: "20px", padding: "5px",
                                borderColor: "rgb(236 88 14)", marginBottom: "0px"
                            }}>  Monitoring Emergency Button
                            </p>
                            <Image src={logo} preview={false} style={{ marginTop: "-40px", marginLeft: "-70px" }} width={70} onClick={addToFirebase} />
                            <p style={{
                                fontSize: "30px",
                                marginTop: "-45px", fontFamily: "BrothersCircus, Arial, serif", color: "#7d2017"
                            }}> RSUD KOTA MATARAM </p>
                        </_Col>

                        <_Col sm={6}>
                            <Spin spinning={loading} >
                                <_Row>
                                    <_Col sm={2} style={style.div}>
                                        <_Row>
                                            <_Col>
                                                <Image src={siren} preview={false} width={40} />
                                            </_Col>
                                            <_Col>
                                                <h1 style={style.value}>
                                                    {datas.length > 0 ? (datas[0].total + jumlahEB + datas[1].total) : jumlahEB}
                                                </h1>
                                            </_Col>
                                            <_Col>
                                                <small style={style.small}> Pasien EB </small>
                                            </_Col>
                                        </_Row>
                                    </_Col> &nbsp;

                                    <_Col sm={2} style={style.div}>
                                        <_Row>
                                            <_Col>
                                                <Image src={ambulance} preview={false} width={40} />
                                            </_Col>
                                            <_Col>
                                                <b> <h1 style={style.value}> {ambul} </h1> </b>
                                            </_Col>
                                            <_Col>
                                                <small style={style.small}> Ambulance </small>
                                            </_Col>
                                        </_Row>
                                    </_Col> &nbsp;

                                    <_Col sm={2} style={style.div}>
                                        <_Row>
                                            <_Col>
                                                <Image src={call} preview={false} width={40} />
                                            </_Col>
                                            <_Col>
                                                <b> <h1 style={style.value}> {datas.length > 0 && datas[0].total} </h1> </b>
                                            </_Col>
                                            <_Col>
                                                <small style={style.small}> Follow Up ({datas.length > 0 && datas[0].status}) </small>
                                            </_Col>
                                        </_Row>
                                    </_Col> &nbsp;


                                    <_Col sm={2} style={style.div}>
                                        <_Row>
                                            <_Col>
                                                <Image src={stop} preview={false} width={40} />
                                            </_Col>
                                            <_Col>
                                                <b> <h1 style={style.value}> {datas.length > 0 && datas[1].total} </h1> </b>
                                            </_Col>
                                            <_Col>
                                                <small style={style.small}> Pasien Ditolak ({datas.length > 0 && datas[1].status}) </small>
                                            </_Col>
                                        </_Row>
                                    </_Col> &nbsp;

                                    <_Col sm={2} style={style.div}>
                                        <_Row onClick={() => setshowDPEB(!showDPEB)}>
                                            <_Col>
                                                <Image src={block} preview={false} width={40} />
                                            </_Col>
                                            <_Col>
                                                <b > <h1 style={style.value}> {pasienanulir} </h1> </b>
                                            </_Col>
                                            <_Col>
                                                <small style={style.small}> Pasien Dianulir </small>
                                            </_Col>
                                        </_Row>
                                    </_Col> &nbsp;
                                </_Row>
                            </Spin>
                        </_Col>
                        <_Col>
                            <_Row>
                                <_Col style={{ ...style.div, cursor: "pointer", background: "#ffa500ba" }} onClick={() => setshowMenu(!showMenu)}>
                                    <_Row>
                                        <_Col>
                                            {/* < WifiOutlined style={{ fontSize: "40px" }} /> */}
                                            <Image src={menu} preview={false} width={40} />
                                        </_Col>
                                        <_Col>
                                            <b> <h1 style={style.value}> MENU </h1> </b>
                                        </_Col>
                                        <_Col>
                                            <small style={style.small}>
                                                {/* <Detector
                                                    render={({ online }) => (
                                                        <>
                                                            {online ? <> &nbsp; Online </> : <> &nbsp; Offline  </>
                                                            }
                                                        </>
                                                    )}
                                                /> */}

                                            </small>
                                        </_Col>
                                    </_Row>
                                </_Col> &nbsp;

                            </_Row>
                        </_Col>

                    </_Row>
                </div>


                <div style={{ paddingLeft: "5px", overflow: "hidden" }} className="site-drawer-render-in-current-wrapper">

                    <Drawer
                        placement="top"
                        bodyStyle={{ background: "#ffc107", padding: "5px 0px", paddingLeft: "50%" }}
                        visible={showMenu}
                        height={60}
                        onClose={() => setshowMenu(false)}
                        getContainer={false}
                        style={{ position: 'absolute' }}
                    >
                        <MenuUtama showPasien={() => setshowDPEB(!showDPEB)} />
                    </Drawer>
                    <br />

                    <MapsPasienEB setjumlahEB={setjumlahEB} getData={getData} />

                    <Drawer
                        placement="top"
                        bodyStyle={{ background: "#ffc107", padding: "15px 5px" }}
                        visible={showDPEB}
                        height={640}
                        onClose={() => setshowDPEB(false)}
                        getContainer={false}
                        style={{ position: 'absolute' }}
                    >

                        {/* <DataPasienEB /> */}
                        <RiwayatEmergencyButton />

                    </Drawer>

                    {/* <_Row>
                        {renderPasienEmer}

                    </_Row> */}

                </div>

            </div>


        </div>
    )
}

export default MonitoringPasienEB
