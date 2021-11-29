import React, { useEffect, useState } from 'react'
import _Api from 'services/Api/_Api'
import { Image, Spin, Form, Button, Table } from 'antd'
import { _Switch } from 'services/Forms/Forms';
import { _Label } from 'services/Forms/Forms';
import moment from 'moment';
import { _Button } from 'services/Forms/Forms';
import { _Date } from 'services/Forms/Forms';
import { _Input } from 'services/Forms/Forms';
import { _Row } from 'services/Forms/LayoutBootstrap';
import { DownloadOutlined } from '@ant-design/icons';

function DataPasienEB() {


    const [pasienEB, setpasienEB] = useState([])
    const [loading, setloading] = useState(false);
    const [cariPasien] = Form.useForm()


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
            title: 'Aktif',
            width: '50px',
            render: (rc) => (<div className="tengah">
                <_Switch defaultChecked={rc.aktif == 1 ? true : false} />
            </div>),
        },
        {
            title: 'No. HP',
            width: '110px',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone.length - b.phone.length,
        },

        {
            title: 'Nama Pasien',
            width: '330px',
            dataIndex: 'nama',
            sorter: (a, b) => a.nama.length - b.nama.length,
        },
        {
            title: 'Alamat',
            width: '530px',
            dataIndex: 'alamat',
            sorter: (a, b) => a.alamat.length - b.alamat.length,
        },




    ];


    const getPasienEB = () => {
        setloading(true)
        _Api.get(`eb-getDataPasienEB`).then(res => {
            setloading(false)
            setpasienEB(res.data)
        })
    }

    useEffect(() => {
        getPasienEB()
    }, [])


    return (
        <div>
            <_Label label="DATA PASIEN EMERGENCY BUTTON " center />
            <Form layout="vertical" onFinish={getPasienEB} form={cariPasien} >
                <_Row>
                    {/* <_Search placeholder="Cari nomor buku  ...." loading={loading} onSearch={cariPasien} sm={3} /> */}
                    <_Input name="nama" placeholder="Nama Pasien" sm={2} />
                    <_Input name="phone" placeholder="Nomor HP" sm={2} />
                    <_Switch name="block" sm={1} />
                    {/* <_Date name="tglAwal" placeholder="Tanggal" sm={2} format="DD-MM-YYYY" />
                    <_Date name="tglAkhir" placeholder=" s/d " sm={2} format="DD-MM-YYYY" /> */}
                    <Button type="primary" icon={<DownloadOutlined />} htmlType="submit" loading={loading}> Refresh </Button>
                </_Row>
            </Form>
            <Table columns={columns} dataSource={pasienEB}
                // rowClassName={(record, index) => record == selected && 'bg-orange'}
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
            />
        </div>
    )
}

export default DataPasienEB
