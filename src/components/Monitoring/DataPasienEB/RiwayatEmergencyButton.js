import React, { useEffect, useState } from 'react'
import _Api from 'services/Api/_Api'
import { Tag, Spin, Form, Button, Table, Checkbox, Image } from 'antd'
import { _Switch } from 'services/Forms/Forms';
import { _Label } from 'services/Forms/Forms';
import moment from 'moment';
import { _Button } from 'services/Forms/Forms';
import { _Date } from 'services/Forms/Forms';
import { _Input } from 'services/Forms/Forms';
import { _Row } from 'services/Forms/LayoutBootstrap';
import { CarOutlined, DownloadOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { HistoryOutlined } from '@material-ui/icons';
import { _Checkbox } from 'services/Forms/Forms';
import ambulance from "./../../../assets/css/images/ambulance1.png"

function RiwayatEmergencyButton() {


    const [pasienEB, setpasienEB] = useState([])
    const [loading, setloading] = useState(false);
    const [cariPasien] = Form.useForm()
    const [tolak, settolak] = useState(false)
    const [ambu, setambu] = useState(false)

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
            title: 'Diff',
            width: 200,
            sorter: true,
            sorter: (a, b) => a.created_at - b.created_at,
            render: (rc) => (
                <div>
                    <HistoryOutlined style={{ paddingTop: "5px" }} /> &nbsp; <b> {moment(rc.created_at).fromNow()} </b>
                </div>),
        },
        {
            title: 'No. HP',
            width: 210,
            sorter: true,
            render: (rc) => (
                <div>
                    <Tag style={{ width: "100%", fontSize: "15px", padding: "5px" }} color="blue"> <b> {rc.phone} </b>  </Tag>
                </div>),
        },
        {
            title: 'Nama Pasien',
            width: 330,
            sorter: (a, b) => a.nama.length - b.nama.length,
            render: (rc) => (
                <div>
                    <b> {rc.nama} </b>
                </div>),
        },

        {
            title: 'Lokasi',
            width: 100,
            sorter: true,
            render: (rc) => (
                <div>
                    <_Button icon={<EnvironmentOutlined />} color="red" label="" />
                </div>),
        },
        {
            title: 'Follow Up',
            width: 100,
            sorter: true,
            render: (rc) => (
                <div>

                    <Tag size="large" color={rc.kode == "cm" ? "green" : "red"}> {rc.status} </Tag>


                </div>),
        },
        {
            title: 'Ambulance',
            width: 120,
            sorter: true,
            render: (rc) => (
                <div className="tengah">
                    {
                        rc.isambulance == "1" &&
                        <Image src={ambulance} width={30} preview={false} />
                        // <CarOutlined style={{ fontSize: "20px" }} />
                        // <Tag size="large" color={"red"}>  </Tag>
                    }


                </div>),
        },
        {
            title: 'Alamat',
            width: 330,
            sorter: true,
            dataIndex: 'alamat',
            // sorter: (a, b) => a.alamat.length - b.alamat.length,
        },
        {
            title: 'Catatan',
            width: 330,
            dataIndex: 'catatan',
            sorter: (a, b) => a.catatan.length - b.catatan.length,
        },




    ];


    const getPasienEB = (val) => {
        setloading(true)
        var param = {
            tolak: tolak,
            ambu: ambu,
        }

        if (val) {
            param = { ...param, ...val }
            console.log(`param`, param)
        }
        _Api.get(`eb-getRiwayatLengkapPasien`, { params: param }).then(res => {
            setpasienEB(res.data.data)
            setloading(false)
        })
    }

    useEffect(() => {
        getPasienEB()
    }, [])


    return (
        <div>
            <_Label label="DATA PASIEN EMERGENCY BUTTON " center />
            <Form layout="vertical" onFinish={getPasienEB} form={cariPasien}
            // initialValues={{ tglAwal: moment(new Date()), tglAkhir: moment(new Date()) }}
            >
                <_Row>
                    {/* <_Search placeholder="Cari nomor buku  ...." loading={loading} onSearch={cariPasien} sm={3} /> */}
                    <_Input name="nama" placeholder="Nama Pasien" sm={2} />
                    <_Input name="phone" placeholder="Nomor HP" sm={1} />
                    <_Date name="tglAwal" placeholder="Tanggal" sm={1} format="DD-MM-YYYY" />
                    <_Date name="tglAkhir" placeholder=" s/d " sm={1} format="DD-MM-YYYY" />
                    <_Checkbox onChange={(e) => settolak(e.target.checked)} name="tolak" placeholder="Status" sm={1}> Ditolak </_Checkbox>
                    <_Checkbox onChange={(e) => setambu(e.target.checked)} name="ambulance" placeholder="Status" sm={1}> Ambulance </_Checkbox>

                    <Button type="primary" icon={<DownloadOutlined />} htmlType="submit" loading={loading}> Refresh </Button>
                </_Row>
            </Form>
            <Table columns={columns} dataSource={pasienEB}
                rowClassName={(record, index) => record.kode == "rj" && 'bg-red'}
                pagination={{ pageSize: 50 }} scroll={{ x: 1400, y: 400 }}
                onRow={(rc, i) => {
                    return {
                        onClick: event => {
                            // setselected(rc)
                        },
                        onDoubleClick: event => {
                            // cekRole == _role.bidan && saveRegistrasiPasien(rc)
                            // saveRegistrasiPasien(rc)
                        }, // double click row
                    };
                }}
                footer={() => <b> Count( {pasienEB.length} ) Pasien </b>}
            />
        </div>
    )
}

export default RiwayatEmergencyButton
