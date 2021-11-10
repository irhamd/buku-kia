import Card from 'components/Card/Card'
import CardAvatar from 'components/Card/CardAvatar'
import CardBody from 'components/Card/CardBody'
import CardHeader from 'components/Card/CardHeader'
import GridItem from 'components/Grid/GridItem'
import React, { useEffect, useState } from 'react'
import avatar from "assets/img/faces/marc.jpg";
import Button from "components/CustomButtons/Button.js";
import GridContainer from 'components/Grid/GridContainer'
import { Image, Spin, Form, Empty, Table } from 'antd'
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
import { _Search } from 'services/Forms/Forms'
import { userLogin } from 'services/Text/GlobalText'
import { _role } from 'services/Text/GlobalText'
import { _Date } from 'services/Forms/Forms'
import { _Input } from 'services/Forms/Forms'
import { NotFound } from 'services/Forms/Forms'
import { collection, onSnapshot } from '@firebase/firestore'
import { db } from 'services/firebase/firebase'
import { _Swall } from 'services/Toastr/Notify/_Toastr'
import { fitrah } from 'services/Text/GlobalText'
import { formatTgl } from 'services/Text/GlobalText'




function DataPasien() {

    const [dataPasien, setdataPasien] = useState([])
    const [showRiwayat, setshowRiwayat] = useState(false)
    const [dataRiwayat, setdataRiwayat] = useState([]);
    const [loading, setloading] = useState(false);
    const [selected, setselected] = useState(null)

    const history = useHistory()
    const pacient = 'x-pacient';
    let cekRole = userLogin.role


    useEffect(() => {
        let cekPasien = _Cache.get("datapasien")
        if (cekPasien) {
            setdataPasien(JSON.parse(cekPasien))
        } else
            cariPasien("")

        _Cache.remove(pacient)

        // onSnapshot(collection(db, "users"), (snap) => {
        // alert("insert")
        // console.log(snap)
        // _Swall.error("Pasien di rujukk")
        // })


    }, [])




    const cariPasien = (val) => {
        setloading(true)
        setselected(null)
        _Api.get("getDataPasien", { params: val }).then(res => {
            setdataPasien(res.data)
            // console.log(`res.data`, res.data)
            _Cache.set("datapasien", JSON.stringify(res.data))
            setloading(false)
        })
    }

    const saveRegistrasiPasien = (item) => {
        var id = item ? item.id : selected && selected.id
        
        if (!id) {
            _Swall.error('Silahkan pilih pasien .!')
            return
        }
        setloading(true)
        var obj = { "id_pasien": id }

        _Api.post("saveRegistrasiPasien", obj).then(res => {
            let dt = res.data
            if (dt.sts == 1) {
                _Swall.success(dt.msg)
            } else {
                _Swall.error(dt.msg)
            }
            setloading(false)
        })
    }

    const columns = [

        {
            title: 'No',
            render: (rc, j, i) => (
                <div className="tengah">  {i + 1} </div>
            ),
            sorter: true,
            width: '100px',
            // fixed: 'left',
        },

        {
            title: 'No. Buku',
            width: '100px',
            dataIndex: 'nobuku',
            sorter: (a, b) => a.nobuku.length - b.nobuku.length,
        },
        {
            title: 'Foto',
            width: '150px',

            render: (rc) => (<div className="tengah">
                <Image src={rc.foto ? rc.foto : src} width={100} style={{ borderRadius: "10% 0px 10%" }} />
            </div>),
        },
        {
            title: 'Nama Pasien',
            width: '230px',
            sorter: (a, b) => a.nama.length - b.nama.length,
            render: (rc) => (<div style={{ fontWeight: "bold" }}>
                <b> {rc.nama.toUpperCase()} </b>
            </div>),
        },
        {
            title: 'Tanggal Lahir',
            render: (rc) => (<>
                {formatTgl(rc.tgllahir)}
            </>),
            width: '130px',
        },
        {
            title: 'Umur',
            render: (rc) => (<>
                {fitrah.getUmur(rc.tgllahir)}
            </>),
            width: '130px',
        },
        {
            title: 'Alamat',
            width: '430px',
            dataIndex: 'alamat',
            sorter: (a, b) => a.alamat.length - b.alamat.length,
        },


        {
            title: 'No. HP',
            width: '130px',
            dataIndex: 'nohp',
            sorter: (a, b) => a.nohp.length - b.nohp.length,
        },


    ];



    return (
        <div>
            <Card>
                <CardHeader color="primary">
                    <p style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "-6px" }}> DATA PASIEN </p>
                    <p>Data pasien pada {dataPegawai.unitkerja}</p>
                </CardHeader>
                <CardBody>
                    <br />
                    <Form layout="vertical" onFinish={cariPasien}>
                        <_Row>
                            {/* <_Search placeholder="Cari nomor buku  ...." loading={loading} onSearch={cariPasien} sm={3} /> */}
                            <_Input name="nama" placeholder="Nama Pasien" sm={3} />
                            <_Input name="nobuku" placeholder="Nomor Buku" sm={2} />
                            <_Button sm={2} save submit loading={loading} />
                        </_Row>
                    </Form>
                    <p> <_Button label="Registrasi" onClick={() => saveRegistrasiPasien(null)} /> </p>
                    {/* <Spin spinning={loading} size="large" tip="Loading..." > */}
                    <Table columns={columns} dataSource={dataPasien}
                        rowClassName={(record, index) => record == selected && 'bg-orange'}
                        pagination={{ pageSize: 5, position: ["topLeft"] }} scroll={{ x: 1400 }}
                        onRow={(rc, i) => {
                            return {
                                onClick: event => {
                                    setselected(rc)
                                },
                                onDoubleClick: event => {
                                    saveRegistrasiPasien(rc)
                                    // saveRegistrasiPasien(rc)


                                }, // double click row
                            };
                        }}
                    />
                    <GridContainer>
                        {dataRiwayat && <RiwayatKunjungan loading={loading} dataRiwayat={dataRiwayat} visible={showRiwayat} onClose={() => setshowRiwayat(false)} />}
                        {/* {dataPasien.length > 0 ? renderPasien : <NotFound label="Data pasien tidak ditemukan ..!" />} */}
                    </GridContainer>
                    {/* </Spin> */}
                    <br />
                    <br />
                </CardBody>
            </Card>
        </div>
    )
}

export default DataPasien
