import Card from 'components/Card/Card'
import CardAvatar from 'components/Card/CardAvatar'
import CardBody from 'components/Card/CardBody'
import CardHeader from 'components/Card/CardHeader'
import GridItem from 'components/Grid/GridItem'
import React, { useEffect, useState } from 'react'
import avatar from "assets/img/faces/marc.jpg";
import GridContainer from 'components/Grid/GridContainer'
import { Form, Input, Button, Checkbox, Spin } from 'antd';
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
import moment from 'moment'
import { _Cache } from 'services/Cache'
import Swal from 'sweetalert2'
import { _Swall } from 'services/Toastr/Notify/_Toastr'
import { DownloadOutlined, RollbackOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router'
import queryString from 'query-string'

function InputKehamilanSaatIni(pr) {

    const [kontrasepsi, setkontrasepsi] = useState([])
    const [tidaktahu, settidaktahu] = useState(false)
    const [loading, setloading] = useState(false)
    const [kehamilan, setkehamilan] = useState([])

    const { search } = useLocation()
    // console.log(search)
    // alert(location)
    const query = queryString.parse(search ? search : "{}")
    // console.log(query)
    const [formKehamilan] = Form.useForm();

    useEffect(() => {
        getData()

        _Api.get("getDataKehamilanSaatIni?id_pasien=" + query.id_pasien).then(res => {
            var data = res.data.data
            console.log(data)
            setkehamilan(data)
            var obj = {
                ...data,
                htp: data ? moment(data.htp) : null,
                hpht: data ? moment(data.hpht) : null
            }
            // console.log(obj)
            formKehamilan.setFieldsValue(obj);
        })
    }, [])



    const onFinish = (val) => {

        setloading(true)
        let id_pasien = _Cache.get('id_pasien')
        var obj = {
            ...val,
            id: kehamilan ? kehamilan.id : null,
            id_pasien: id_pasien,
            htp: val.htp ? moment(val.htp).format('YYYY-MM-DD') : val.htp,
            hpht: val.hpht ? moment(val.hpht).format('YYYY-MM-DD') : val.hpht
        }
        _Api.post('simpanDataKehamilanSaatIni', obj).then(res => {
            _Swall.success("Suksess ...!")
            formKehamilan.resetFields()
            setloading(false)
        }).catch(err => {
            setloading(false)
            _Swall.error("Gagal ...")
        })

    };

    const getData = () => {
        _Api.post("getMasterData", { "masterData": "penggunaankontrasepsi_m", "limit": "100" }).then(res => {
            setkontrasepsi(res.data)
            console.log(res.data)
        })
    }



    const cekHTP = (e, tgl) => {
        // var tgl = e.target.value
        var hpht = moment(e).format('YYYY-MM-DD');
        settidaktahu(false)
        var htp = moment(hpht).add(8, 'month').add(10, 'days').format("YYYY-MM-DD");
        formKehamilan.setFieldsValue({
            htp: htp != 'Invalid date' ? moment(htp) : null
        });

        // formKehamilan.setFieldsValue((e)=> {'htp' : htp})
        // $("#htp").val(htp)
    }

    const tidakTahuHPHT = (e) => {
        settidaktahu(e)
        if (e) {
            formKehamilan.setFieldsValue({
                htp: null,
                hpht: null,
            });
        }

        // formKehamilan.setFieldsValue((e)=> {'htp' : htp})
        // $("#htp").val(htp)
    }

    return (
        <div>
            <Card>
                <CardHeader color="primary">
                    <p style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "-6px" }}> DATA KEHAMILAN </p>
                    <p>Input Data Kehamilaan Saat Ini</p>
                </CardHeader>
                <CardBody>
                    <br />
                    <Form size="large"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 12,
                        }}
                        onFinish={onFinish} form={formKehamilan}
                        autoComplete="off"
                    >
                        <_Switch checked={tidaktahu} label="HPHT Terakhir" name="tt" titleCheck="Tidak Tahu" titleUnCheck="Tahu" onChange={tidakTahuHPHT} />
                        <_Date label="(Hari Pertama Haid Terakhir (HPHT))" name="hpht" format="DD / MM / YYYY" onChange={cekHTP} />
                        <_Date label="Hari Taksiran Persalinan (HTP)" name="htp" format="DD / MM / YYYY" />
                        <_Select label="Penggunaan Kontrasepsi Sebelum Hamil" option={kontrasepsi} val="id" caption="kontrasepsi" name="penggunaankontrasepsi" style={{ fontWeight: "bold" }} />
                        <_Input label="Riwayat Penyakit Yang diderita Ibu" required name="riwayatpenyakit" multiline />
                        <_Input label="Riwayat Alergi" multiline name="riwayatalergi" />
                        <_Input label="Status Imunisasi Tetanus (T) terakhir" required name="tetanustrakhir" />
                        <_Input label="Tinggi Badan" required addonAfter="cm" name="tb" />
                        <br />
                        <_Row>
                            <_Input sm={3} label="Gravidalum" addonAfter="G" name="g" />
                            <_Input sm={3} label="Paritas" addonAfter="P" name="p" />
                            <_Input sm={3} label="Abortion" addonAfter="A" name="a" />
                            <_Input sm={3} label="O (Anak Hidup)" addonAfter="O" name="o" />
                        </_Row>

                        <hr />
                        <_Row>
                            <_Col sm="5" />
                            <_Button label="Simpan" loading={loading} icon={<DownloadOutlined />} submit block sm={3} />
                            <_Button label="Batal" icon={<RollbackOutlined />} danger block sm={3} />
                        </_Row>

                    </Form>
                    <br />
                    <br />
                </CardBody>
            </Card >
        </div >
    )
}

export default InputKehamilanSaatIni
