import React, { useEffect, useState } from 'react'
import 'moment/locale/id'
import _Api from 'services/Api/_Api'
import moment from 'moment'
import { _Button } from 'services/Forms/Forms';
import { useLocation } from 'react-router';
import queryString from 'query-string'
import { Divider, Spin } from 'antd';
import DetailPasien from 'components/Pasien/DetailPasien';
import { _Label } from 'services/Forms/Forms';



function GetJadwal({ dataJadwal }) {

    var idLocale = require('moment/locale/id');
    moment.locale('id', idLocale);

    const getTanggal = (item) => {
        var hari = moment(item.jadwal).format('dddd')
        var tanggal = moment(item.jadwal).format('DD')
        const tahun = moment(item.jadwal).format('YYYY').toString()
        const bulan = moment(item.jadwal).format('MMMM').toString()

        var mystr = (bulan).slice(0, 5);
        return (
            <div>
                {tanggal + ' ' + mystr + ' ' + tahun}

            </div>
        )

    }




    const renderJadwal = dataJadwal.map((item, index) => {
        return (
            <div className={item.isdatang == 1 ? "header-bottom1 jadwal-done" : index % 2 == 0 ? "header-bottom1  jadwal2" : "header-bottom1 jadwal1"}>
                <div key={index} className="header-head">
                    <h4>Kunj - {item.kunjunganke}</h4>
                    <h6>{getTanggal(item)}</h6>
                    <div className="bottom-head">
                        <p>{moment(item.jadwal).format('dddd')}</p>
                    </div>
                </div>
            </div>
        )
    })


    return (
        <div>
            {renderJadwal}

        </div>
    )
}


function JadwalKunjungan() {
    const [loading, setLoading] = useState(false)
    const [dataJadwal, setDataJadwal] = useState([])
    // const pasien = JSON.parse(localStorage.getItem('datapasien'))

    const { search } = useLocation()
    const query = queryString.parse(search ? search : "{}")

    const LoadData = () => {
        setLoading(true)
        _Api.get(`getJadwalKunjungan?id_pasien=${query.key}`).then(res => {
            setDataJadwal(res.data.data)
            setLoading(false)
        })
    }


    useEffect(() => {
        LoadData()
    }, [])

    return (
        <Spin spinning={loading} tip="Loading ..." >
            <div className="col-md-12 weather-grids widget-shadow">
                <div className="header-top b">
                    <p>
                        <h2>  JADWAL KUNJUNGAN</h2>
                    </p>
                    <br />
                    <p>
                        <_Button label="USG" />
                    </p>
                </div>
                <div className="header-bottom" style={{ overflow: "auto", height: "800px" }}>
                    <br />
                    <DetailPasien />
                    <div style={{ padding: "20px" }}>
                        <_Label label="JADWAL KUNJUNGAN" />
                        <GetJadwal dataJadwal={dataJadwal} />
                    </div>
                </div>
                <br />
                <br />
                <br />
            </div>
        </Spin>

    )
}

export default JadwalKunjungan
