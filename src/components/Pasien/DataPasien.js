import Card from 'components/Card/Card'
import CardAvatar from 'components/Card/CardAvatar'
import CardBody from 'components/Card/CardBody'
import CardHeader from 'components/Card/CardHeader'
import GridItem from 'components/Grid/GridItem'
import React, { useEffect, useState } from 'react'
import avatar from "assets/img/faces/marc.jpg";
import Button from "components/CustomButtons/Button.js";
import GridContainer from 'components/Grid/GridContainer'
import { Image, Spin } from 'antd'
import _Api from 'services/Api/_Api'
import src from "assets/img/no_image.jpg"
import { _Row } from 'services/Forms/LayoutBootstrap'
import { _Col } from 'services/Forms/LayoutBootstrap'
import { _Button } from 'services/Forms/Forms'
import { BarChartOutlined, HistoryOutlined } from '@material-ui/icons'
import { AreaChartOutlined, CalendarOutlined, DeploymentUnitOutlined, FieldTimeOutlined, NodeIndexOutlined } from '@ant-design/icons'
import { _Cache } from 'services/Cache'
import { dataPegawai } from 'services/Text/GlobalText'
import { useHistory } from 'react-router'
import RiwayatKunjungan from './Riwayat/RiwayatKunjungan'


function DataPasien() {

    const [dataPasien, setdataPasien] = useState(null)
    const [showRiwayat, setshowRiwayat] = useState(false)
    const [dataRiwayat, setdataRiwayat] = useState([]);
    const [loading, setloading] = useState(false);

    const history = useHistory()

    useEffect(() => {
        _Api.get("getDataPasien").then(res => {
            setdataPasien(res.data)
        })
        _Cache.remove('x-pacient')
    }, [])

    const prosesPasien = (data) => {
        console.log(data)
        // _Cache.set('id_pasien', id_pasien)
        // _Cache.set('x-pacient', JSON.stringify(data))
        // history.push("/admin/InputKunjungan")
    }
    const dataKehamilan = (data) => {
        _Cache.set('x-pacient', JSON.stringify(data))
        history.push("/admin/InputKehamilanSaatIni?id_pasien=" + data.id)

    }

    const riwayatPasien = async (data) => {
        setshowRiwayat(true)
        setdataRiwayat([])
        // console.log(data)
        _Cache.set('x-pacient', JSON.stringify(data))
        setloading(true)
        await _Api.get("getKunjunganByPasien?id_pasien=" + data.id).then(res => {
            setdataRiwayat(res.data.data)

            // console.log(res.data.data)
            setloading(false)

        })
    }

    const jadwalKunjungan = async (data) => {
        _Cache.set('x-pacient', JSON.stringify(data))
        history.push("/admin/JadwalKunjungan?key=" + data.id)
    }

    const renderPasien = dataPasien && dataPasien.map((item, i) => {
        return (
            <GridItem md={12} key={i} style={{ marginTop: "-50px" }}>
                <Card>
                    <_Row style={{ background: "#de68a959", borderRadius: "5px" }}>
                        <_Col sm={2} >
                            <div style={{ textAlign: "center" }}>
                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                    <Image width={200} style={{ borderRadius: "5px", marginTop: "5px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(171, 71, 188, 0.32)" }}
                                        src={item.foto ? item.foto : src}
                                    />
                                </a>
                            </div>
                        </_Col>
                        <_Col sm={9}>
                            <div style={{ margin: "20px 10px 10px 40px" }}>
                                <p className="title-b">{item.nobuku}</p>
                                <p className="title-a">{item.nama && item.nama.toUpperCase()}</p>
                                <p> {item.alamat} </p>
                                <_Row>
                                    <_Button label="Proses" block sm={2} color="#da2b8b" onClick={() => prosesPasien(item)} icon={<DeploymentUnitOutlined />} />
                                    <_Button label="Pertumbuhan Janin" color="#da2b8b" icon={<AreaChartOutlined />} block sm={3} />
                                    <_Button label="Riwayat" icon={<FieldTimeOutlined />} color="orangered" onClick={() => riwayatPasien(item)} block sm={2} />
                                    <_Button label="Kehamilan" icon={<NodeIndexOutlined />} color="orangered" onClick={() => dataKehamilan(item)} block sm={2} />
                                    <_Button label="Jadwal Kunjungan" icon={<CalendarOutlined />} color="orangered" block sm={3} onClick={() => jadwalKunjungan(item)} />

                                </_Row>
                            </div>
                        </_Col>

                    </_Row>

                </Card>
            </GridItem>
        )
    })

    return (
        <div>
            <Card>
                <CardHeader color="primary">
                    <p style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "-6px" }}> DATA PASIEN </p>
                    <p>Data pasien pada {dataPegawai.unitkerja}</p>
                </CardHeader>
                <CardBody>
                    <br />
                    <Spin spinning={dataPasien ? false : true} size="large" tip="Loading..." >
                        <GridContainer>
                            {dataRiwayat && <RiwayatKunjungan loading={loading} dataRiwayat={dataRiwayat} visible={showRiwayat} onClose={() => setshowRiwayat(false)} />}
                            {renderPasien}
                        </GridContainer>
                    </Spin>
                    <br />
                    <br />
                </CardBody>
            </Card>
        </div>
    )
}

export default DataPasien
