import { Descriptions } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { _Cache } from 'services/Cache'
import { _Label } from 'services/Forms/Forms'
import { formatTgl } from 'services/Text/GlobalText'
import { fitrah } from 'services/Text/GlobalText'

function DetailPasien() {

    // const [dataPasien, setdataPasien] = useState()
    const history = useHistory()

    var data = _Cache.get('x-pacient')
    var dataPasien = {}
    if (data) { dataPasien = JSON.parse(data) }

    useEffect(() => {
        if (!data) history.push('/admin/dataPasien')
        console.log(`ERROR`, 'Data Pasien belum ada .!')
    }, [])

    return (
        <div>
            <Descriptions
                bordered
                size={"small"}
                column={3}
                contentStyle={{ background: "rgb(64 169 255 / 13%)", fontWeight: "bold" }}
                labelStyle={{ textAlign: "right" }}
            >
                <Descriptions.Item label="No. Buku : ">{dataPasien && dataPasien.nobuku}</Descriptions.Item>
                <Descriptions.Item label="Nama Pasien :">{dataPasien && dataPasien.nama}</Descriptions.Item>
                {/* <Descriptions.Item label="Nama Pasien">{dataPasien && dataPasien.nama}</Descriptions.Item> */}
                <Descriptions.Item label="No. KTP :">{dataPasien && dataPasien.nik}</Descriptions.Item>
                <Descriptions.Item label="Tempat Lahir :">{dataPasien && dataPasien.tempatlahir}</Descriptions.Item>
                <Descriptions.Item label="Tanggal Lahir :">{formatTgl(dataPasien && dataPasien.tgllahir)} / {fitrah.getUmur(dataPasien && dataPasien.tgllahir)}</Descriptions.Item>
                {/* <Descriptions.Item label="Tgl Lahir :">{formatTgl("")} /  </Descriptions.Item> */}
                <Descriptions.Item label="Golongan Darah :"> &nbsp;{dataPasien && dataPasien.goldarah}</Descriptions.Item>
                <Descriptions.Item label="Kunjungan Saat Ini :"> &nbsp;{dataPasien && dataPasien.kunjunganke + 1}</Descriptions.Item>
                <Descriptions.Item span={4} label="Alamat :">{dataPasien && dataPasien.alamat}</Descriptions.Item>
            </Descriptions>
            <br />
        </div>
    )
}

export default DetailPasien
