import avatar from "assets/img/faces/marc.jpg";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useEffect, useState } from "react";

import { List, Avatar, Space, Image } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import _Api from "services/Api/_Api";

function DataPasienRujuk() {

    const [pasienRujuk, setpasienRujuk] = useState([])
    const [loading, setloading] = useState(false);

    const getData = () => {
        setloading(true)
        _Api.get("getPasienRujuk?rujuk=0").then(res => {
            console.log(`res.data`, res.data.data)
            setpasienRujuk(res.data.data)
            // setloading(false)
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
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 3,
                        }}
                        dataSource={pasienRujuk && pasienRujuk}
                        footer={
                            <div>
                                {/* <b>ant design</b> footer part */}
                            </div>
                        }
                        renderItem={item => (
                            <List.Item
                                style={{ background: "linear-gradient(white 90%, rgb(219 188 223 / 32%))" }}
                                key={item.id}
                                actions={[
                                    <IconText icon={StarOutlined} text="kunjungan : 3" key="list-vertical-star-o" />,
                                    <IconText icon={LikeOutlined} text="UK : 4 Bulan" key="list-vertical-like-o" />,
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
                                <p>    {
                                    item.keterangan && item.keterangan.map((val, i) => {
                                        return (
                                            < div key={i} >
                                                <p style={{ margin: "-4px 0px -4px 0px" }}> <b> {i + 1}. {val.keterangan} </b>  </p>
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
                            </List.Item>
                        )}
                    />,
                </CardBody>
            </Card>
        </div>
    )
}

export default DataPasienRujuk
