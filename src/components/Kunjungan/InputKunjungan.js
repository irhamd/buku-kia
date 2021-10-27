import Card from 'components/Card/Card'
import CardAvatar from 'components/Card/CardAvatar'
import CardBody from 'components/Card/CardBody'
import CardHeader from 'components/Card/CardHeader'
import GridItem from 'components/Grid/GridItem'
import React, { useEffect, useState } from 'react'
import avatar from "assets/img/faces/marc.jpg";
import GridContainer from 'components/Grid/GridContainer'
import { Form, Input, Button, Checkbox, Spin, BackTop, Collapse } from 'antd';
import _Api from 'services/Api/_Api'
import src from "assets/img/no_image.jpg"
import { _Input } from 'services/Forms/Forms'
import { _Date } from 'services/Forms/Forms'
import { _Select } from 'services/Forms/Forms'
import { _Number } from 'services/Forms/Forms'
import { _Switch } from 'services/Forms/Forms'
import { _Row } from 'services/Forms/LayoutBootstrap'
import { _Button } from 'services/Forms/Forms'
import { _Col } from 'services/Forms/LayoutBootstrap'
import { Cache } from 'services/Cache'
import { useHistory } from 'react-router'
import PushArray from 'services/array/PushArray'
import warning from 'assets/img/warning.png'


function Warning() {
    return (
        <img src={warning} className="mt-10 ml5" height="10" alt="#" />
    )
}


function InputKunjungan() {
    const posisiBayi = []
    const [keluhan, setKeluhan] = useState([])
    const [hasilLab, sethasilLab] = useState([])
    const [letakJanin, setletakJanin] = useState([])
    const [masukpanggul, setmasukpanggul] = useState(false)
    // const data = JSON.parse(Cache.get("datapasien"))
    const [dataPasien, setdataPasien] = useState(1)

    const [isHB, setisHB] = useState(false)


    const history = useHistory();
    const { Panel } = Collapse;
    const arr = {
        keluhan: [],
        hasillab: [],
        letakjanin: ""
    }
    useEffect(() => {
        getData()
    }, [])

    const changeKeluhan = (e) => {
        PushArray(e, arr.keluhan)
    };

    const changeLetakJanin = (e) => {
        arr.letakjanin = e.target.value
    };

    const changeHasilLab = (e) => {
        if (e.target.checked && e.target.value == 4)
            setisHB(true)
        else
            setisHB(false)
        // setisHB(e.target.checked ? true : false)
        PushArray(e, arr.hasillab)
    };


    const renderKeluhan = keluhan.map((item, index) => {
        return (
            <>
                <label className="containerc" key={item.id} style={{ fontSize: "15px", fontWeight: "bold", height: "30px" }}>
                    <span className="checkboxC" style={{ color: item.isrujuk == 1 ? 'maroon' : '#6d5959' }}> {index + 1}. {item.keluhan}
                        {item.isrujuk == 1 ? <Warning /> : ""}
                    </span>
                    <input type="checkbox" value={item.id} onChange={changeKeluhan} />
                    <span className="checkmark" />
                </label>
            </>
        )
    })

    const renderLetakJanin = letakJanin.map(item => {
        return (
            <label className="containerc" key={item.id} style={{ fontSize: "15px", fontWeight: "bold", height: "30px" }}>
                <span className="radioR" style={{ color: item.isrujuk == 1 ? 'maroon' : '' }}> {item.letakjanin}
                    {item.isrujuk == 1 ? <Warning /> : ""}
                </span>
                <input name="radio" type="radio" value={item.id} onChange={changeLetakJanin} />
                <span className="checkmark" style={{ width: "30px"}} />
            </label>
        )
    })


    const renderHasilLab = hasilLab.map(item => {
        return (
            <label className="containerc" key={item.id} style={{ fontSize: "15px", fontWeight: "bold", height: "30px" }}>
                <span className="checkboxC" style={{ color: item.isrujuk == 1 ? 'maroon' : '' }}> {item.hasillab}
                    {item.isrujuk == 1 ? <Warning /> : ""}
                </span>
                <input type="checkbox" value={item.id} onChange={changeHasilLab} />
                <span className="checkmark" />
            </label>
        )
    })





    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const getData = () => {
        _Api.post("getMasterData", { "masterData": "keluhan_m", "limit": "100" }).then(res => {
            setKeluhan(res.data)
        })

        _Api.post("getMasterData", { "masterData": "letakjanin_m", "limit": "100" }).then(res => {
            setletakJanin(res.data)
        })
        _Api.post("getMasterData", { "masterData": "hasillab_m", "limit": "100" }).then(res => {
            sethasilLab(res.data)

            // if ($("#umurkehamilan").val() == "") {
            //     history.push("InputKehamilanSaatIni")
            //     return
            // }

        })
    }



    return (
        <div>
            <Card>
                <CardHeader color="primary">
                    <p style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "-6px" }}> INPUT KUNJUNGAN </p>
                    <p>Input kunjungan pasien saat ini</p>
                </CardHeader>
                <CardBody>
                    <br />
                    <Spin spinning={dataPasien ? false : true} size="large" tip="Loading..." >
                        <Form size="large" onFinish={onFinish} autoComplete="off"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            <_Date label="Tanggal" name="hpht" format="DD / MM / YYYY" required />
                            <_Input label="Berat Badan (BB)" name="riwayatalergi" addonAfter="kg" required />
                            <_Input label="Tekanan Darah (T.D )" name="riwayatalergi" addonAfter="(mmHg)" required />
                            <_Input label="LILA" name="lila" addonAfter="(cm)" required />
                            <_Input label="Tinggi Fundus" name="lila1" addonAfter="(cm)" required />
                            <_Switch label="Masuk Panggul" name="tt" titleCheck="Sudah" titleUnCheck="Belum" />
                            <_Input label="Perkiraan Berat Janin" disabled name="lila1" addonAfter="gram" />
                            <_Input label="Imunisasi" name="lila1" />
                            <_Input label="Tablet Tambah Darah" name="lila1" addonAfter="transfusi" />
                            <_Input label="Analisa" multiline name="lila1" />
                            <_Input label="Tata Laksana" multiline name="lila1" />
                            <_Input label="Konseling" name="lila1" />

                            {/* <_Date label="Hari Taksiran Persalinan (HTP)" name="htp" format="DD / MM / YYYY" />
                            <_Select label="Penggunaan Kontrasepsi Sebelum Hamil" required name="penggunaankontrasepsi" style={{ fontWeight: "bold" }} />
                            <_Input label="Riwayat Penyakit Yang diderita Ibu" required name="riwayatpenyakit" multiline />
                            <_Input label="Status Imunisasi Tetanus (T) terakhir" name="tetanustrakhir" />
                            <_Input label="Tinggi Badan" required addonAfter="cm" name="tb" /> */}

                            <br />
                            <br />

                            <Collapse defaultActiveKey={['1']} size="small">
                                <Panel header="KELUHAN PASIEN" key="1">
                                    <br />
                                    {renderKeluhan}

                                </Panel>

                            </Collapse>,


                            <hr />
                            <_Row>
                                <_Col sm="6">

                                    <Collapse defaultActiveKey={['1']} size="small">
                                        <Panel header="KELUHAN PASIEN" key="1">
                                            <br />
                                            {renderHasilLab}
                                        </Panel>

                                    </Collapse>,
                                </_Col>
                                <_Col sm="4">
                                    <Collapse defaultActiveKey={['1']} size="small">
                                        <Panel header="KELUHAN PASIEN" key="1">
                                            <br />
                                            {renderLetakJanin}

                                        </Panel>

                                    </Collapse>,
                                </_Col>
                            </_Row>
                            <_Row>
                                <_Col sm="5" />
                                <_Button label="Simpan" submit block sm={3} />
                                <_Button label="Batal" danger block sm={3} />
                            </_Row>

                        </Form>
                    </Spin>


                </CardBody>
            </Card >

            <BackTop>
                <div>UP</div>
            </BackTop>

        </div >
    )
}

export default InputKunjungan
