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


function InputKehamilanSaatIni() {

    const [kontrasepsi, setkontrasepsi] = useState([])
    const [tidaktahu, settidaktahu] = useState(false)


    useEffect(() => {
        // _Api.get("getDataPasien").then(res => {
        //     setdataPasien(res.data)
        //     console.log(res.data)
        // })

        getData()
    }, [])


    const [formKehamilan] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
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
                        <_Input label="Status Imunisasi Tetanus (T) terakhir" name="tetanustrakhir" />
                        <_Input label="Tinggi Badan" required addonAfter="cm" name="tb" />
                        <br />
                        <_Row>
                            <_Input sm={3} label="Gravidalum" addonAfter="G" name="p" />
                            <_Input sm={3} label="Paritas" addonAfter="P" name="p" />
                            <_Input sm={3} label="Abortion" addonAfter="A" name="a" />
                            <_Input sm={3} label="O (Anak Hidup)" addonAfter="O" name="o" />
                        </_Row>

                        <hr />
                        <_Row>
                            <_Col sm="5" />
                            <_Button label="Simpan" submit block sm={3} />
                            <_Button label="Batal" danger block sm={3} />
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
