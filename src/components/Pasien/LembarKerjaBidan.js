import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import CardHeader from 'components/Card/CardHeader'
import React, { useEffect, useState } from 'react'
import { Drawer, Image, Modal } from 'antd'
import _Api from 'services/Api/_Api'
import { _Row } from 'services/Forms/LayoutBootstrap'
import { _Col } from 'services/Forms/LayoutBootstrap'
import { _Button } from 'services/Forms/Forms'
import { AreaChartOutlined, CalendarOutlined, DeploymentUnitOutlined, FieldTimeOutlined, NodeIndexOutlined } from '@ant-design/icons'
import { _Cache } from 'services/Cache'
import { dataPegawai } from 'services/Text/GlobalText'
import { useHistory } from 'react-router'
import { _Search } from 'services/Forms/Forms'
import { userLogin } from 'services/Text/GlobalText'
import { _role } from 'services/Text/GlobalText'
import DetailPasien from './DetailPasien'
import InputKunjungan from 'components/Kunjungan/InputKunjungan'
import InputKehamilanSaatIni from 'components/DataKehamilan/InputKehamilanSaatIni'
import RiwayatKunjungan from './Riwayat/RiwayatKunjungan'
import JadwalKunjungan from 'components/DataKehamilan/JadwalKunjungan'

function LembarKerjaBidan() {

    const [dataPasien, setdataPasien] = useState(null)
    const [showRiwayat, setshowRiwayat] = useState(false)
    const [showJadwal, setshowJadwal] = useState(false)
    const [dataRiwayat, setdataRiwayat] = useState([]);
    const [loading, setloading] = useState(false);

    const history = useHistory()
    const pacient = 'x-pacient';


    var data = _Cache.get(pacient)
    var dataPacient = {}
    if (data) {
        dataPacient = JSON.parse(data)
    } else history.push("/admin/DataPasien")


    useEffect(() => {
        let cekPasien = _Cache.get("datapasien")
        console.log(`dataPacient`, dataPacient)
        cekPasien ? setdataPasien(JSON.parse(cekPasien)) : ""
        // _Cache.remove(pacient)
    }, [])

    const riwayatPasien = async () => {
        setshowRiwayat(true)
        setdataRiwayat([])
        // console.log(data)
        // _Cache.set(pacient, JSON.stringify(data))
        setloading(true)
        await _Api.get("getKunjunganByPasien?id_pasien=" + dataPacient.id).then(res => {
            setdataRiwayat(res.data.data)
            // console.log(res.data.data)
            setloading(false)

        })
    }



    return (
        <div>
            <Card>
                <CardHeader color="primary">
                    <p style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "-6px" }}> LEMBAR KERJA BIDAN / PERAWAT </p>
                    <p>Lembar kerja bidan {dataPegawai.unitkerja}</p>
                </CardHeader>
                <CardBody>

                    <br /> <br />

                    <DetailPasien column={2} />
                    <_Row>
                        {/* <_Button label="Proses pasien" color="#da2b8b" onClick={prosesPasien} icon={<AreaChartOutlined />} block sm={3} /> */}
                        <_Button label="Pertumbuhan Janin" color="#da2b8b" icon={<AreaChartOutlined />} block sm={3} />
                        <_Button label="Riwayat" icon={<FieldTimeOutlined />} color="orangered" onClick={() => riwayatPasien()} block sm={3} />
                        {/* <_Button label="Data Kehamilan" icon={<NodeIndexOutlined />} color="orangered" onClick={() => dataKehamilan()} block sm={3} /> */}
                        <_Button label="Jadwal Kunjungan" icon={<CalendarOutlined />} color="orangered" block sm={3} onClick={() => setshowJadwal(true)} />
                    </_Row>

                    <br />
                    <br />
                    <hr />
                    <InputKehamilanSaatIni showdetail />
                    <InputKunjungan />

                    {dataRiwayat && <RiwayatKunjungan loading={loading} dataRiwayat={dataRiwayat} visible={showRiwayat} onClose={() => setshowRiwayat(false)} />}
                    {showJadwal && <JadwalKunjungan visible={showJadwal} onClose={() => setshowJadwal(false)} />}





                </CardBody>
            </Card>
        </div>
    )
}

export default LembarKerjaBidan
