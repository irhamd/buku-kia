import avatar from "assets/img/faces/marc.jpg";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useEffect, useState } from "react";

import { List, Form, Space, Image, Tabs } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import _Api from "services/Api/_Api";
import { _Button } from "services/Forms/Forms";
import { _Row } from "services/Forms/LayoutBootstrap";
import Swal from "sweetalert2";
import { _Input } from "services/Forms/Forms";
import { _Date } from "services/Forms/Forms";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, onSnapshot, query, doc, where, } from "firebase/firestore";
import { db } from "services/firebase/firebase";
import { _Col } from "services/Forms/LayoutBootstrap";
import { _Swall } from "services/Toastr/Notify/_Toastr";
import { fireCollectiom } from "services/firebase/UFirebase";
import { F } from "services/firebase/UFirebase";
import { updateFirebase } from "services/firebase/UFirebase";

function PasienDitolak() {

    const [pasienRujuk, setpasienRujuk] = useState([])
    const [loading, setloading] = useState(false);
    const [nohp, setnohp] = useState([]);
    const [idd, setidd] = useState(null)

    // const colPasienRujuk = collection(db, "pasien");

    const { TabPane } = Tabs;

    var status = "request"
    var array = []
    const getData = () => {
        setloading(true)
        _Api.get("getPasienRujuk?rujuk=0").then(res => {
            // console.log(`res.data`, res.data.data)
            setpasienRujuk(res.data.data)
            setloading(false)
            setidd(null)

        })
    }
 
  
    useEffect(() => {
        getData()

        onSnapshot(doc(db, F.service, F.faskes), (doc) => {
            getData()

        });
    }, [])

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );


    const gaya = {
        title: { fontSize: "26px", paddingTop: "20px", marginBottom: "-10px" },
        diskripsi: { color: "orange", fontWeight: "bold", fontSize: "16px" },
        avatar: { borderRadius: "50%" }
    }

    return (
        <div>
            <Card>
                <CardHeader color="primary">
                    <p style={{ fontSize: "24px", fontWeight: "bold", fontSize: "20px", marginBottom: "-6px" }}> DATA PASIEN YANG DI TOLAK RS </p>
                    <p>Data pasien yang di rekemndasikan untuk di rujuk ke Rumah Sakit</p>
                </CardHeader>
                <CardBody>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: page => {

                            },
                            pageSize: 3,
                        }}
                        dataSource={pasienRujuk && pasienRujuk}
                        footer={
                            <div>
                                {/* <b>ant design</b> footer part */}
                            </div>
                        }
                        pagination={{
                            pageSize: 3,
                            position: "both"
                        }}
                        renderItem={(item, idx) => (
                            <List.Item
                                style={{ background: "linear-gradient(white 90%, rgb(219 188 223 / 32%))" }}
                                key={item.id}
                                actions={[
                                    <IconText icon={StarOutlined} text="kunjungan : 1" key="list-vertical-star-o" />,
                                    <IconText icon={LikeOutlined} text={"UK : " + idx} key="list-vertical-like-o" />,
                                ]}
                            // extra={
                            //     <div style={{ background: "#fea9ad", padding: "10px", borderRadius: "5px", width: "600px", fontWeight: "bold", fontSize: "15px" }}>
                            //         {/* <p> ALASAN </p> */}

                            //     </div>
                            // }
                            >
                                <List.Item.Meta
                                    avatar={<Image width={95} height={90} style={gaya.avatar} src={item.foto} />}
                                    title={<div style={gaya.title} >{item.nama && item.nama.toUpperCase()}</div>}
                                    description={<div>

                                        <span style={gaya.diskripsi}> <small> No. Buku </small> : <b> {item.nobuku} <small> No. Hp </small> : {item.nohp} </b> </span>
                                        <br />
                                        <b> {item.alamat} </b>
                                    </div>}
                                />
                                <_Row>
                                    <_Col>
                                        <p style={{ background: "#df132726", borderRadius: "5px", padding: "10px" }}>
                                            <p> Alasan :  </p>
                                            {
                                                item.keterangan && item.keterangan.map((val, i) => {
                                                    return (
                                                        < div key={i} >
                                                            <p className="b" style={{ margin: "-4px 0px -4px 0px", fontWeight: "bold", color: "#b73e3e", fontSize: "18px" }}> <b> {i + 1}. {val.keterangan} </b>  </p>
                                                        </div>

                                                        // <label className="containerc " key={i}>
                                                        //     <span className="checkboxC" style={{ color: 'maroon' }}> {i + 1}. {val.keterangan}
                                                        //     </span>
                                                        //     <input disabled type="checkbox" value={val.id} />
                                                        //     <span className="checkmark" />
                                                        // </label>
                                                    )
                                                })
                                            }
                                        </p>
                                    </_Col>
                                    {/* <_Col sm={3}>
                                                <_Input label="Nomor HP yang bisa dihubungi" onChange={(e) => {
                                                    array[idx] = e.target.value.toString()
                                                    console.log(array)
                                                    setnohp(array)
                                                }} />
                                            </_Col> */}
                                </_Row>

                            </List.Item>
                        )}
                    />



                </CardBody>
            </Card>
        </div>
    )
}

export default PasienDitolak
