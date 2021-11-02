import React, { useEffect, useState } from 'react'
import 'moment/locale/id'
import _Api from 'services/Api/_Api'
import moment from 'moment'
import { _Button } from 'services/Forms/Forms';
import { useLocation } from 'react-router';
import queryString from 'query-string'
import { Divider, Spin, Drawer } from 'antd';
import DetailPasien from 'components/Pasien/DetailPasien';
import { _Label } from 'services/Forms/Forms';
import { _Cache } from 'services/Cache';



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
                    <span style={{ fontWeight: "700", fontSize: "14px" }}>Kunj - {item.kunjunganke}</span>
                    <span style={{ fontWeight: "700", fontSize: "20px", color: "#001529" }}>{getTanggal(item)}</span>
                    <div className="bottom-head">
                        <p style={{ color: "#1777df" }}>{moment(item.jadwal).format('dddd')}</p>
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


function JadwalKunjungan(pr) {
    const [loading, setLoading] = useState(false)
    const [dataJadwal, setDataJadwal] = useState([])
    // const pasien = JSON.parse(localStorage.getItem('datapasien'))

    const { search } = useLocation()
    const query = queryString.parse(search ? search : "{}")


    var data = _Cache.get('x-pacient')
    var dataPacient = {}
    if (data) {
        dataPacient = JSON.parse(data)
    } else history.push("/admin/DataPasien")


    const LoadData = () => {
        setLoading(true)
        _Api.get(`getJadwalKunjungan?id_pasien=${dataPacient.id}`).then(res => {
            setDataJadwal(res.data.data)
            setLoading(false)
        })
    }


    useEffect(() => {
        LoadData()
    }, [])

    return (

        <Drawer
            placement="top"
            style={{ margin: "-10px" }}
            headerStyle={{ background: "#f19ecf", height: "1px" }}
            onClose={pr.onClose}
            width={"100%"}
            height={"100%"}
            visible={pr.visible}
            getContainer={false}
        >

            <Spin spinning={loading} tip="Loading ..." >
                <div className="col-md-12 weather-grids widget-shadow">
                    <div className="header-top b">
                        <p>
                            <h2>  JADWAL KUNJUNGAN</h2>
                        </p>
                        <br />
                        <p>
                            <_Button label="Tutup" cancel onClick={() => pr.onClose()} />
                        </p>
                    </div>
                    <div className="header-bottom" style={{ overflow: "auto", height: "800px" }}>
                        <br />
                        <DetailPasien />
                        <div style={{ padding: "10px" }}>
                            <_Label label="JADWAL KUNJUNGAN" />
                            <GetJadwal dataJadwal={dataJadwal} />
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                </div>
            </Spin>
        </Drawer>

    )
}

export default JadwalKunjungan
