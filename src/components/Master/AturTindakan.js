import avatar from "assets/img/faces/marc.jpg";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useEffect, useState } from "react";

import { List, Avatar, Space, Image, Skeleton } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import _Api from "services/Api/_Api";
import { _Switch } from "services/Forms/Forms";
import { _Row } from "services/Forms/LayoutBootstrap";

function AturTindakan() {

    const [keluhan, setkeluhan] = useState([])
    const [loading, setloading] = useState(false);
    const [idd, setidd] = useState(null);


    const getData = () => {
        setloading(true)
        _Api.post("getMasterData", { "masterData": "keluhan_m", "limit": "100" }).then(res => {
            setloading(false)
            setkeluhan(res.data)
            // console.log(res.data)
        })
    }

    const updateKeluhanRujuk = (e, idd) => {
        setidd(idd)
        var obj = {
            id: idd,
            isrujuk: e
        }
        _Api.post("updateKeluhanRujuk", obj).then(res => {
            getData()
            setidd(null)
            // console.log(res.data)
        })
    }


    useEffect(() => {
        getData()
    }, [])

     return (
        <div>
            <Card>
                <CardHeader color="primary">
                    <p style={{ fontSize: "24px", fontWeight: "bold", fontSize: "20px", marginBottom: "-6px" }}> ATUR KELUHAN </p>
                    <p>List keluhan ini akan muncul ketika pasien berkunjung .</p>
                </CardHeader>
                <CardBody>
                    <br />
                    <div
                        id="scrollableDiv"
                        style={{
                            height: 700,
                            overflow: 'auto',
                            padding: '0 16px',
                            border: '1px solid rgba(140, 140, 140, 0.35)',
                        }}
                    >

                        <List
                            size="small"
                            loading = {keluhan.length == 0}
                            className="demo-loadmore-list"
                            itemLayout="horizontal"
                            dataSource={keluhan}
                            renderItem={(item, i) =>
                                console.log(item) || (
                                    <List.Item
                                        style={{ background: item.isrujuk == 1 && "#fdd688" }}
                                    >
                                        <List.Item.Meta
                                            title={<a> {i + 1}.{item.keluhan}</a>}
                                        />
                                        <_Switch
                                            defaultChecked={item.isrujuk == 1 ? true : false}
                                            titleCheck="Perlu rujuk"
                                            sm={2}
                                            loading={item.id == idd ? true : false}
                                            onChange={(e) => updateKeluhanRujuk(e, item.id)}
                                            titleUnCheck="-" />

                                        <_Switch
                                            sm={2}
                                            defaultChecked={item.aktif == 1 ? true : false}
                                            titleCheck="Aktif"
                                            disabled
                                            loading={item.id == idd ? true : false}
                                            // onChange={(e) => updateKeluhanRujuk(e, item.id)}
                                            titleUnCheck="Tidak Aktif" />
                                    </List.Item>
                                )
                            }
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default AturTindakan
