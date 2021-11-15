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
import $ from "jquery"
import { IssuesCloseOutlined, SettingOutlined } from '@ant-design/icons'
import { _Cache } from 'services/Cache'
import moment from 'moment'
import DetailPasien from 'components/Pasien/DetailPasien'
import { fitrah } from 'services/Text/GlobalText'
import { _Swall } from 'services/Toastr/Notify/_Toastr'
import { _RadioGroup } from 'services/Forms/Forms'


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
    const [id, setid] = useState("")
    // const data = JSON.parse(Cache.get("datapasien"))
    // const [dataPasien, setdataPasien] = useState(1)


    const history = useHistory();
    const { Panel } = Collapse;
    const [form] = Form.useForm()
    var arr = {
        keluhan: [],
        hasillab: [],
        letakjanin: ""
    }
    useEffect(() => {
        getData()
    }, [])

    var data = _Cache.get('x-pacient')
    var dataPasien = {}
    if (data) {
        dataPasien = JSON.parse(data)
    } else history.push("/admin/DataPasien")

    const changeKeluhan = (e) => {
        PushArray(e, arr.keluhan)
    };

    const changeLetakJanin = (e) => {
        arr.letakjanin = e.target.value
    };

    const changeHasilLab = async (e) => {
        // console.log(e.target.defaultValue)
        // if (e.target.checked && e.target.value == 4)
        //     setisHB(true)
        // else
        //     setisHB(false)
        // setisHB(e.target.checked ? true : false)
        await PushArray(e, arr.hasillab)

        // console.log(arr.hasillab)
    };

    const onFinish = (val) => {
        var obj = {
            ...val,
            id: id,
            tanggal: moment(val.tanggal).format('YYYY-MM-DD'),
            listKeluhan: arr.keluhan.toString(),
            listHasilLab: arr.hasillab.toString(),
            id_pasien: dataPasien.id_pasien,
            id_pasienregistrasi: dataPasien.id_pr,
            masukpanggul: val.masukpanggul ? 1 : 0,
            vaksin1: val.vaksin1,
            vaksin2: val.vaksin2,
            vaksin3: val.vaksin3,

            timbang: val.timbang,
            linkarlengan: val.linkarlengan,
            tinggirahim: val.tinggirahim,
            skreningdokter: val.skreningdokter,
            // ppia: val.ppia,

            letakjanin: arr.letakjanin,
            kunjunganke: dataPasien.kunjunganke + 1,
            umurkehamilan1: fitrah.getUmur(dataPasien.hpht),
        }
        // console.log('Success:', val);
        // console.log(obj)
        // console.log(`arr`, arr)

        _Api.post("saveKunjungan", obj).then(res => {
            if (res.data.sts == 1) {
                _Swall.success("Suksess .")
                setid(res.data.id_kunjungan)
                // console.log(obj)
                _Api.get("checkPasienDiRujuk?id_pasien=" + dataPasien.id_pasien
                    + "&id_kunjungan=" + res.data.id_kunjungan
                    + "&tinggifundus=" + val.tinggifundus
                    + "&tablettambahdarah=" + val.tablettambahdarah
                    + "&hb=" + val.hb).then(res => { })
            }
            else _Swall.error(res.data.msg)

            // form.resetFields()

        }).cath(err => {
            _Swall.error("Gagal ...")

        })



    };

    // const cekBeratJanin = (e) => {
    //     var kj = $("#masukpanggul").is(':checked') ? 11 : 12
    //     var tf = e.target.value
    //     let berat = (tf - kj) * 155;
    //     $("#beratjanin").val(berat > 0 ? berat : 0)
    // }


    const cekBeratJanin = (e) => {
        var tfu = form.getFieldValue("tinggifundus")
        if (e == "-") {
            var kj = masukpanggul ? 11 : 12
        } else {
            var kj = e ? 11 : 12
            setmasukpanggul(e)
        }
        let berat = (parseInt(tfu) - kj) * 155;

        var beratjanin = berat > 0 ? berat : 0
        form.setFieldsValue({
            beratjanin: beratjanin.toString()
        })
    }

    const sudahBelum = [
        { value: "1", label: "Sudah" },
        { value: "0", label: "Belum" },
    ]

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


    const renderKeluhan = keluhan.map((item, index) => {
        return (
            <div key={index}>
                <label className="containerc" key={item.id} style={{ fontSize: "15px", fontWeight: "bold", height: "30px" }}>
                    <span className="checkboxC" style={{ color: item.isrujuk == 1 ? 'maroon' : '#000000b3' }}> {index + 1}. {item.keluhan}
                        {item.isrujuk == 1 ? <Warning /> : ""}
                    </span>
                    <input type="checkbox" value={item.id} onChange={changeKeluhan} />
                    <span className="checkmark" />
                </label>
            </div>
        )
    })

    const renderLetakJanin = letakJanin.map(item => {
        return (
            <label className="containerc" key={item.id} style={{ fontSize: "15px", fontWeight: "bold", height: "30px" }}>
                <span className="radioR" style={{ color: item.isrujuk == 1 ? 'maroon' : '#000000b3' }}> {item.letakjanin}
                    {item.isrujuk == 1 ? <Warning /> : ""}
                </span>
                <input name="radioLetakJanin" type="radio" className="idletakjanin" value={item.id} onChange={changeLetakJanin} />
                <span className="checkmark" style={{ width: "30px" }} />
            </label>
        )
    })


    const renderHasilLab = hasilLab.map(item => {
        return (
            <label className="containerc" key={item.id} style={{ fontSize: "15px", fontWeight: "bold", height: "30px" }}>
                <span className="checkboxC" style={{ color: item.isrujuk == 1 ? 'maroon' : '#000000b3' }}> {item.hasillab}
                    {item.isrujuk == 1 ? <Warning /> : ""}
                </span>
                <input type="checkbox" value={item.id} onChange={changeHasilLab} />
                <span className="checkmark" />
            </label>
        )
    })


    return (
        <div>
            <Card>
                <CardHeader color="primary">
                    <p style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "-6px" }}> INPUT KUNJUNGAN </p>
                    <p>Input data kunjungan pasien saat ini </p>
                </CardHeader>
                <CardBody>
                    {/* <DetailPasien /> */}
                    <Spin spinning={dataPasien ? false : true} size="large" tip="Loading..." >
                        <Form size="large" onFinish={onFinish} autoComplete="off" form={form}
                            labelCol={{ span: 8 }}
                            // layout="vertical"
                            initialValues={{
                                tanggal: moment()
                            }}
                            wrapperCol={{ span: 12 }}
                        >

                            <_Date label="Tanggal" name="tanggal" format="DD / MM / YYYY" required />
                            <_Input label="Berat Badan (BB)" name="beratbadan" addonAfter="kg" required />
                            <_Input label="Timbang" name="timbang" addonAfter="kg" required />
                            <_Input label="Ukur Lingkar Lengan Atas" name="linkarlengan" addonAfter="kg" required />
                            <_Input label="Periksa Tinggi Rahim" name="tinggirahim" addonAfter="kg" required />
                            <_Input label="Tekanan Darah (T.D )" name="tekanandarah" addonAfter="(mmHg)" required />
                            <_Input label="LILA" name="lila" addonAfter="(cm)" required />
                            <_Input label="Tinggi Fundus" name="tinggifundus" addonAfter="(cm)" onChange={() => cekBeratJanin('-')} required />
                            <_Switch label="Masuk Panggul" name="masukpanggul" titleCheck="Sudah" onChange={(e) => cekBeratJanin(e)} titleUnCheck="Belum" />
                            <_Input label="Perkiraan Berat Janin" disabled name="beratjanin" addonAfter="gram" />
                            <_Input label="Imunisasi" name="imunisasi" />
                            <_Input label="Tablet Tambah Darah" name="tablettambahdarah" addonAfter="transfusi" />
                            <_Input label="Analisa" multiline name="analisa" />
                            <_Input label="Tata Laksana" multiline name="tatalaksana" />
                            <_Input label="Konseling" name="konseling" />
                            {/* <_Input label="Sudah Vaksin" name="Vaksin" /> */}
                            <_RadioGroup options={sudahBelum} label="Vaksin 1" name="vaksin1" />
                            <_RadioGroup options={sudahBelum} label="Vaksin 2" name="vaksin2" />
                            <_RadioGroup options={sudahBelum} label="Vaksin 3" name="vaksin3" />
                            {/* 
                            <_Date label="Hari Taksiran Persalinan (HTP)" name="htp" format="DD / MM / YYYY" />
                            <_Select label="Penggunaan Kontrasepsi Sebelum Hamil" required name="penggunaankontrasepsi" style={{ fontWeight: "bold" }} />
                            <_Input label="Riwayat Penyakit Yang diderita Ibu" required name="riwayatpenyakit" multiline />
                            <_Input label="Status Imunisasi Tetanus (T) terakhir" name="tetanustrakhir" />
                            <_Input label="Tinggi Badan" required addonAfter="cm" name="tb" /> 
                            */}

                            <br />
                            <br />

                            <Collapse defaultActiveKey={['1']} size="small">
                                <Panel header="KELUHAN PASIEN" key="1">
                                    <small> Silahkan centang salah satu keluhan pasien  </small>
                                    <br /> <br />
                                    {renderKeluhan}
                                    <p className="w100">
                                        <_Input label="" sm={12} />
                                    </p>
                                </Panel>
                            </Collapse>


                            <hr />
                            <Collapse defaultActiveKey={['1']} size="small">
                                <Panel header="HASIL LAB" key="1">
                                    <_Row>
                                        <_Col>
                                            <br />
                                            <_Input name="hb" label="Hemoglobin (HB)" />
                                            <_Input name="goldarah" label="Golongan Darah" />
                                            <_Input name="proteinurine" label="Protein Urine" />
                                            <_Input name="guladarah" label="Gula Darah" />
                                            <_Input multiline name="hasillablainnya" label="Lain - lain" />

                                        </_Col>
                                        <_Col sm={5}>
                                            <br />
                                            {renderHasilLab}
                                        </_Col>
                                    </_Row>
                                </Panel>

                            </Collapse>,
                            {/* <_Col sm="4">
                                    <Collapse defaultActiveKey={['1']} size="small">
                                        <Panel header="LETAK JANIN" key="1">
                                            <br />
                                            {renderLetakJanin}
                                        </Panel>

                                    </Collapse>,
                                </_Col> */}
                            <_Row>
                                <_Col sm={3} />
                                <_Button save color="#096dd9bd" label="Simpan Keluhan Pasien" submit block sm={5} />
                                <_Button cancel label="Batal" danger block sm={3} />
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
