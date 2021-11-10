import { Descriptions, Image } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { _Cache } from 'services/Cache'
import { _Label } from 'services/Forms/Forms'
import { _Row, _Col } from 'services/Forms/LayoutBootstrap'
import { formatTgl } from 'services/Text/GlobalText'
import { fitrah } from 'services/Text/GlobalText'
import src from "assets/img/no_image.jpg"

function DetailPasien(pr) {

    // const [dataPasien, setdataPasien] = useState()
    const history = useHistory()

    var data = _Cache.get('x-pacient')
    var dataPasien = {}
    if (data) {
        dataPasien = JSON.parse(data)
        // console.log('INI ADAKAHHH', dataPasien)
    }

    useEffect(() => {
        if (!data) history.push('/admin/dataPasien')
    }, [])

    return (
        <div>
            <_Row>
                <_Col sm={3} >
                    <div className=" w100 tengah ">
                        <Image style={{ borderRadius: "10px 0px" }} className="boxShadow" height={200} src={dataPasien.foto ? dataPasien.foto : src} />
                        <br /> <br />
                    </div>
                </_Col>
                <_Col sm={8} >

                    <Descriptions
                        bordered
                        size={"small"}
                        column={pr.column ? pr.column : 2}
                        style={{ width: "100%" }}
                        contentStyle={{ background: "rgb(64 169 255 / 13%)", fontWeight: "bold" }}
                        labelStyle={{ textAlign: "right" }}
                    >
                        <Descriptions.Item label="No. Buku : ">{dataPasien && dataPasien.nobuku}</Descriptions.Item>
                        {/* <Descriptions.Item label="Nama Pasien">{dataPasien && dataPasien.nama}</Descriptions.Item> */}
                        <Descriptions.Item label="Nama Pasien :">{dataPasien && dataPasien.nama}</Descriptions.Item>
                        <Descriptions.Item label="No. KTP :">{dataPasien && dataPasien.nik}</Descriptions.Item>
                        <Descriptions.Item label="Tempat Lahir :">{dataPasien && dataPasien.tempatlahir}</Descriptions.Item>
                        <Descriptions.Item label="Tanggal Lahir / Umur:">{formatTgl(dataPasien && dataPasien.tgllahir)} / {fitrah.getUmur(dataPasien && dataPasien.tgllahir)} </Descriptions.Item>
                        {/* <Descriptions.Item label="Tgl Lahir :">{formatTgl("")} /  </Descriptions.Item> */}
                        <Descriptions.Item label="HPHT :"> &nbsp;{dataPasien && formatTgl(dataPasien.hpht)}</Descriptions.Item>
                        <Descriptions.Item label="Kunjungan Ke :"> &nbsp;{dataPasien && dataPasien.kunjunganke + 1}</Descriptions.Item>
                        <Descriptions.Item label="Umur Kehamilan :"> &nbsp;{dataPasien && fitrah.getUmur(dataPasien.hpht)}</Descriptions.Item>
                        {/* <Descriptions.Item label=""> &nbsp;</Descriptions.Item> */}
                        <Descriptions.Item span={3} label="Alamat :">{dataPasien && dataPasien.alamat}</Descriptions.Item>
                    </Descriptions>
                </_Col>
            </_Row>

            <br />
        </div>
    )
}

export default DetailPasien
