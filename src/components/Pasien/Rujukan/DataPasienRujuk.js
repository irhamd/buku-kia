import avatar from "assets/img/faces/marc.jpg";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useEffect, useState } from "react";

import { List, Form, Space, Image } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import _Api from "services/Api/_Api";
import { _Button } from "services/Forms/Forms";
import { _Row } from "services/Forms/LayoutBootstrap";
import Swal from "sweetalert2";
import { _Input } from "services/Forms/Forms";
import { _Date } from "services/Forms/Forms";

function DataPasienRujuk() {

    const [pasienRujuk, setpasienRujuk] = useState([])
    const [loading, setloading] = useState(false);

    const getData = () => {
        setloading(true)
        _Api.get("getPasienRujuk?rujuk=0").then(res => {
            // console.log(`res.data`, res.data.data)
            setpasienRujuk(res.data.data)
            setloading(false)
        })
    }

    const tidakPerluRujuk = () => {
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
                // settidakPerluRujuk(id)
            }

        })
    }



    useEffect(() => {
        getData()
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
                            position :"both"
                          }}
                        renderItem={item => (
                            <List.Item
                                style={{ background: "linear-gradient(white 90%, rgb(219 188 223 / 32%))" }}
                                key={item.id}
                                actions={[
                                    <IconText icon={StarOutlined} text="kunjungan : 1" key="list-vertical-star-o" />,
                                    <IconText icon={LikeOutlined} text="UK : " key="list-vertical-like-o" />,
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
                                    } </p>
                                <_Row>
                                    <_Button save label="Rujuk" block sm={2} />
                                    <_Button label="Tidak perlu dirujuk" block sm={3} onClick={tidakPerluRujuk} color="orangered" cancel />
                                </_Row>
                            </List.Item>
                        )}
                    />,
                    {/* <p> <_Button label="Rujuk" /> </p> */}
                </CardBody>
            </Card>
        </div>
    )
}

export default DataPasienRujuk
