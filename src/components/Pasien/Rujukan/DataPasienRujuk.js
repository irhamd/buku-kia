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

function DataPasienRujuk() {

    const [pasienRujuk, setpasienRujuk] = useState([])
    const [loading, setloading] = useState(false);
    const [nohp, setnohp] = useState([]);
    const colPasienRujuk = collection(db, "pasien");

    const { TabPane } = Tabs;

    var status = "request"
    var array = []
    const getData = () => {
        setloading(true)
        _Api.get("getPasienRujuk?rujuk=0").then(res => {
            // console.log(`res.data`, res.data.data)
            setpasienRujuk(res.data.data)
            setloading(false)
        })
    }

    const tidakPerluRujuk = ({ id }) => {
        Swal.fire({
            title: 'Pasien tidak perlu di Rujuk ?',
            text: "Harap pertimbangkan kondisi pasien.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ac4181',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, tidak perlu dirujuk',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                _Api.get("tidakPerluDiRujuk/" + id).then(res => {
                    if (res.data.cek == 1) {
                        // _Swall.success("Suksess ....")
                        getData()
                    } else {
                        _Swall.error("Gagal .")
                    }
                }).catch(err => {
                    _Swall.error("Gagal .Err")

                })
            }

        })
    }

    const rujukPasien = async (item) => {

        setloading(true)
        // console.log(`item`, item)

        await addDoc(colPasienRujuk,
            {
                nama: item.nama,
                nohp: item.nohp,
                id_pasien: item.id_pasien,
                nobuku: item.nobuku,
                alamat: item.alamat,
                isrujuk: true,
                foto: item.foto,
                status: status,
                faskes: item.unitkerja,
                id_pasienrujuk: item.id
            }
        );


        _Api.get(`updateStatusPasienRujuk/${item.id}/${status} `).then(res => {
            if (res.data.sts == 1) {
                // _Swall.success("Suksess ....")
                setloading(false)
                getData()
            } else {
                _Swall.error("Gagal .")
            }
        }).catch(err => {
            _Swall.error("Gagal .Err")

        })



    };

    useEffect(() => {
        onSnapshot(
            collection(db, "pasien"),
            where("isrujuk", "==", true),
            // where("status", "!=", "commit"),
            (snapshot) => {
                getData()
            }
        )

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
                    <p style={{ fontSize: "24px", fontWeight: "bold", fontSize: "20px", marginBottom: "-6px" }}> REKOMENDASI PASIEN DI RUJUK </p>
                    <p>Data pasien yang di rekemndasikan untuk di rujuk ke Rumah Sakit</p>
                </CardHeader>
                <CardBody>
                    <br />
                    <Form layout="vertical" onFinish={getData}>
                        <_Row>
                            {/* <_Search placeholder="Cari nomor buku  ...." loading={loading} onSearch={cariPasien} sm={3} /> */}
                            <_Input name="nama" placeholder="Nama Pasien" sm={3} />
                            <_Input name="nobuku" placeholder="Nomor Buku" sm={2} />
                            <_Date name="tanggaldari" placeholder="Tanggal" sm={2} />
                            <_Date name="tanggalsampai" placeholder=" s/d " sm={2} />
                            <_Button sm={2} save submit loading={loading} />
                        </_Row>
                    </Form>

                    <Tabs defaultActiveKey="1" type="card">
                        <TabPane tab="Rekomendasi Pasien Rujuk" key="1">
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

                                                <span style={gaya.diskripsi}> <b> {item.nobuku} </b> </span>
                                                <br />
                                                <b> {item.alamat} </b>
                                            </div>}
                                        />
                                        <_Row>
                                            <_Col sm={8}>
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
                                            <_Col sm={3}>
                                                <_Input label="Nomor HP yang bisa dihubungi" onChange={(e) => {
                                                    array[idx] = e.target.value.toString()
                                                    console.log(array)
                                                    setnohp(array)
                                                }} />
                                            </_Col>
                                        </_Row>
                                        <_Row>
                                            {!item.status ?
                                                <>
                                                    <_Button save label="Rujuk" onClick={() => rujukPasien(item)} block sm={3} />
                                                    <_Button label="Tidak perlu dirujuk" block sm={3} onClick={() => tidakPerluRujuk(item)} color="orangered" cancel />
                                                </>
                                                : item.status == status ?
                                                    <>
                                                        <_Button save label={"Menunggu Konfirmasi RS"} loading block sm={4} />
                                                    </>
                                                    : item.status == "konfirm" &&
                                                    <>
                                                        <_Button save color="green" label={"Proses RS"} loading block sm={4} />
                                                    </>
                                            }
                                        </_Row>
                                    </List.Item>
                                )}
                            />
                        </TabPane>
                        <TabPane tab="Data Pasien Dirujuk" key="2">
                            Content of card tab 2
                        </TabPane>
                        <TabPane tab="Card Tab 3" key="3">
                            Content of card tab 3
                        </TabPane>
                    </Tabs>


                    <p> {JSON.stringify(array)} </p>
                    {/* <p> <_Button label="Rujuk" /> </p> */}
                </CardBody>
            </Card>
        </div>
    )
}

export default DataPasienRujuk
