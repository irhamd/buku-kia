import avatar from "assets/img/faces/marc.jpg";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useEffect, useState } from "react";

import { List, Avatar, Space, Image } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import _Api from "services/Api/_Api";

function AturTindakan() {

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

    const data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
    ];

    return (
        <div>
            <Card>
                <CardHeader color="primary">
                    <p style={{ fontSize: "24px", fontWeight: "bold", fontSize: "20px", marginBottom: "-6px" }}> ATUR KELUHAN / TINDAKAN  PASIEN </p>
                    <p>List keluhan ini akan muncul ketika pasien berkunjung .</p>
                </CardHeader>
                <CardBody>
                    <br />
                    <List
                        size="small"
                        header={<div>Header</div>}
                        footer={<div>Footer</div>}
                        bordered
                        dataSource={data}
                        renderItem={(item,i ) => 
                        <List.Item  extra={<div>Extra</div>}> {i+1}. {item}</List.Item>}
                    />
                </CardBody>
            </Card>
        </div>
    )
}

export default AturTindakan
