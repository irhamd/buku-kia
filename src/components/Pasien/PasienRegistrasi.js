import Card from 'components/Card/Card'
import CardAvatar from 'components/Card/CardAvatar'
import CardBody from 'components/Card/CardBody'
import CardHeader from 'components/Card/CardHeader'
import GridItem from 'components/Grid/GridItem'
import React, { useEffect, useState } from 'react'
import avatar from "assets/img/faces/marc.jpg";
import Button from "components/CustomButtons/Button.js";
import GridContainer from 'components/Grid/GridContainer'
import { Image, Spin, Form, Empty } from 'antd'
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
import { _Search } from 'services/Forms/Forms'
import { userLogin } from 'services/Text/GlobalText'
import { _role } from 'services/Text/GlobalText'
import { _Date } from 'services/Forms/Forms'
import { _Input } from 'services/Forms/Forms'
import { NotFound } from 'services/Forms/Forms'
import { _Swall } from 'services/Toastr/Notify/_Toastr'
import { cekRefresh } from 'services/Text/GlobalText'
import moment from 'moment'


function PasienRegistrasi() {

    const [loading, setloading] = useState(false);
    const [pasienRegistrasi, setpasienRegistrasi] = useState([]);
    const [cekUpdate, setcekUpdate] = useState(false);
    const [formRegistrasi] = Form.useForm()
    const history = useHistory()
    const pacient = 'x-pacient';
    let cekRole = userLogin.role

    const loadData = (val) => {

        // console.log(`object`, object)
        setloading(true)
        _Api.get("daftarRegistrasiPasien", { params: val }).then(res => {
            // console.log(res.data)
            setpasienRegistrasi(res.data)
            // _Cache.set("datapasien", JSON.stringify(res.data))
            setloading(false)
        })
    }


    const prosesPasien = (data) => {
        // console.log(data)
        // _Cache.set('id_pasien', id_pasien)
        _Cache.set(pacient, JSON.stringify(data))
        // history.push("/admin/InputKunjungan")
        history.push("/admin/LembarKerjaBidan")


    }

    const pemeriksaanDokter = (data) => {
        // console.log(data)
        // _Cache.set('id_pasien', id_pasien)
        _Cache.set(pacient, JSON.stringify(data))
        history.push("/admin/PemeriksaanDokter")
    }
    const dataKehamilan = (data) => {
        _Cache.set(pacient, JSON.stringify(data))
        history.push("/admin/InputKehamilanSaatIni?id_pasien=" + data.id)

    }

    const evaluasiKesehatanBumil = (data) => {
        _Cache.set(pacient, JSON.stringify(data))
        history.push("/admin/EvaluasiKesehatanBumil")

    }

    const riwayatPasien = async (data) => {
        setshowRiwayat(true)
        setdataRiwayat([])
        // console.log(data)
        _Cache.set(pacient, JSON.stringify(data))
        setloading(true)
        await _Api.get("getKunjunganByPasien?id_pasien=" + data.id).then(res => {
            setdataRiwayat(res.data.data)

            // console.log(res.data.data)
            setloading(false)

        })
    }


    useEffect(() => {
        // loadData()
        formRegistrasi.submit()
        if (cekUpdate)
            cekRefresh()

    }, [])


    const renderPasienRegister = pasienRegistrasi && pasienRegistrasi.map((item, i) => {
        return (
            <GridItem md={12} key={i} style={{ marginTop: "-50px" }}>
                <Card>
                    <_Row style={{ background: "#de68a959", borderRadius: "5px" }}>
                        <_Col sm={2} >
                            <div style={{ textAlign: "center" }}>
                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                    <Image width={200} style={{ borderRadius: "15px 0px", marginTop: "5px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(171, 71, 188, 0.32)" }}
                                        src={item.foto ? item.foto : src}
                                    />
                                </a>
                            </div>
                        </_Col>
                        <_Col sm={9}>
                            <div style={{ margin: "20px 10px 10px 40px" }}>
                                <p className="title-b" style={{ color: "#d3307b" }}>{item.nobuku}</p>
                                <p className="title-a">{item.nama && item.nama.toUpperCase()} </p>
                                <p> {item.alamat} </p>
                                <_Row>

                                    {cekRole == _role.bidan &&
                                        <_Button label="Lembar Kerja" block sm={3} color="#da2b8b" disabled={item.kunjunganke == 0} onClick={() => prosesPasien(item)} icon={<DeploymentUnitOutlined />} />
                                    }
                                    {cekRole == _role.dokter &&
                                        <>
                                            <_Button label="Pemeriksaan Dokter" block sm={3} color="#da2b8b" onClick={() => pemeriksaanDokter(item)} icon={<DeploymentUnitOutlined />} />
                                            <_Button label="Evaluasi Kesehatan Ibu Hamil" block sm={5} color="#da2b8b" onClick={() => evaluasiKesehatanBumil(item)} icon={<DeploymentUnitOutlined />} />
                                        </>
                                    }
                                    <_Button label="Data Kehamilan" icon={<NodeIndexOutlined />} color="orangered" onClick={() => dataKehamilan(item)} block sm={3} />

                                </_Row>
                                {/* <hr />
                                <_Button label="Data Kehamilan" icon={<NodeIndexOutlined />} color="orangered" block sm={3} /> */}
                            </div>
                        </_Col>

                    </_Row>



                </Card>
            </GridItem>
        )
    })


    useEffect(() => {
        // loadData("")
    }, [])

    return (
        <div>
            {/* <h1> PASIEN REGISTRASI</h1> */}
            <Card>
                <CardHeader color="primary">
                    <p style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "-6px" }}> PASIEN REGISTRASI </p>
                    <p>Daftar registrasi pasien {dataPegawai.unitkerja}</p>
                </CardHeader>
                <CardBody>
                    <br />
                    <Form layout="vertical" onFinish={loadData} form={formRegistrasi} initialValues={{ tglAwal: moment(), tglAkhir: moment() }} >
                        <_Row>
                            {/* <_Search placeholder="Cari nomor buku  ...." loading={loading} onSearch={cariPasien} sm={3} /> */}
                            <_Input name="nama" placeholder="Nama Pasien" sm={3} />
                            <_Input name="nobuku" placeholder="Nomor Buku" sm={2} />
                            <_Date name="tglAwal" placeholder="Tanggal" sm={2} format="DD-MM-YYYY" />
                            <_Date name="tglAkhir" placeholder=" s/d " sm={2} format="DD-MM-YYYY" />
                            <_Button sm={2} save submit loading={loading} />
                        </_Row>
                    </Form>

                    <br /> <br />
                    {/* <Spin spinning={loading} size="large" tip="Loading..." > */}
                    <GridContainer>
                        {pasienRegistrasi.length > 0 ? renderPasienRegister : <NotFound label="Data pasien tidak ditemukan ..!" />}
                    </GridContainer>
                    {/* </Spin> */}
                    <br />
                    <br />
                </CardBody>
            </Card>


        </div>
    )
}

export default PasienRegistrasi
