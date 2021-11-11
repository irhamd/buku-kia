import Card from 'components/Card/Card'
import CardAvatar from 'components/Card/CardAvatar'
import CardBody from 'components/Card/CardBody'
import CardHeader from 'components/Card/CardHeader'
import GridItem from 'components/Grid/GridItem'
import React, { useEffect, useState } from 'react'
import avatar from "assets/img/faces/marc.jpg";
import GridContainer from 'components/Grid/GridContainer'
import { Form, Input, Button, Checkbox, Spin, InputNumber } from 'antd';
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
import { useHistory, useLocation } from 'react-router'
import queryString from 'query-string'
import DetailPasien from 'components/Pasien/DetailPasien'
import { _RadioGroup } from 'services/Forms/Forms'

function InputKehamilanSaatIni(pr) {

    const [kontrasepsi, setkontrasepsi] = useState([])
    const [tidaktahu, settidaktahu] = useState(false)
    const [loading, setloading] = useState(false)
    const [kehamilan, setkehamilan] = useState([])

    const { search } = useLocation()
    const history = useHistory()
    var query = ""
    // console.log(query)
    const [formKehamilan] = Form.useForm();

    var cekPas = _Cache.get('x-pacient');
    if (cekPas) {
        query = JSON.parse(cekPas)
    } else
        history.push("/admin/dataPasien")

    useEffect(() => {
        getData()
        setloading(true)
        _Api.get("getDataKehamilanSaatIni?id_pasien=" + query.id_pasien).then(res => {
            var data = res.data.data
            setloading(false)
            setkehamilan(data)
            if (data) {
                var init = {
                    ...data,
                    htp: data.htp ? moment(data.htp) : "",
                    hpht: data.hpht ? moment(data.hpht) : "",
                    id: data ? data.id : ""
                }
            }
            // console.log(init)
            formKehamilan.setFieldsValue(init);
        })
    }, [])


    const batal = () => {
        history.goBack()
    }



    const onFinish = (val) => {

        setloading(true)
        var obj = {
            ...val,
            id: kehamilan ? kehamilan.id : null,
            id_pasien: query.id_pasien,
            htp: val.htp ? moment(val.htp).format('YYYY-MM-DD') : val.htp,
            hpht: val.hpht ? moment(val.hpht).format('YYYY-MM-DD') : val.hpht
        }
        _Api.post('simpanDataKehamilanSaatIni', obj).then(res => {
            if (res.data.sts == 1) {
                _Swall.success(res.data.msg)
                history.goBack()
            } else
                _Swall.error(res.data.msg)
            // formKehamilan.resetFields()
            setloading(false)
        }).catch(err => {
            setloading(false)
            _Swall.error("Gagal ...")
        })

    };

    const getData = () => {
        setloading(true)
        _Api.post("getMasterData", { "masterData": "penggunaankontrasepsi_m", "limit": "100" }).then(res => {
            setloading(false)
            setkontrasepsi(res.data)
            // console.log(res.data)
        })
    }


    // const setkontrasepsi = [
    //     {id : 7 , kontrasepsi : "Pil KB"},
    //     {id : 6 , kontrasepsi : "Suntik"},
    //     {id : 2 , kontrasepsi : "Implan"},
    //     {id : 3 , kontrasepsi : "Kondom"},
    //     {id : 1 , kontrasepsi : "-"},
    // ]




    const cekHTPlama = (e, tgl) => {
        // var tgl = e.target.value
        var hpht = moment(e).format('YYYY-MM-DD');
        settidaktahu(false)
        var htp = moment(hpht).add(8, 'month').add(10, 'days').format("YYYY-MM-DD");
        formKehamilan.setFieldsValue({
            htp: htp != 'Invalid date' ? moment(htp) : null
        });
    }

    const cekHTP = (e, tgl) => {
        // var tgl = e.target.value
        var bulan = moment(e).format('MM');

        if (bulan > 3) {
            var htp = moment(e)
                .add(1, 'years')
                .subtract(3, 'month')
                .add(7, 'days')
                .format("YYYY-MM-DD");
        } else {
            var htp = moment(e)
                .add(9, 'month')
                .add(7, 'days')
                .format("YYYY-MM-DD");
        }

        formKehamilan.setFieldsValue({
            htp: htp != 'Invalid date' ? moment(htp) : null
        });

        // console.log(`bulan`, htp)

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
                    <Spin spinning={loading} >

                        {!pr.showdetail ? <DetailPasien /> : ""}

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
                            <_Date label="(Hari Pertama Haid Terakhir (HPHT))" name="hpht" required={!tidaktahu} format="DD / MM / YYYY" onChange={cekHTP} />
                            <_Date label="Hari Taksiran Persalinan (HTP)" name="htp" format="DD / MM / YYYY" required={!tidaktahu} />
                            {/* <_Select label="Penggunaan Kontrasepsi Sebelum Hamil" option={kontrasepsi} val="id" caption="kontrasepsi" name="penggunaankontrasepsi" style={{ fontWeight: "bold" }} /> */}
                            <_RadioGroup options={[
                                { value: "7", label: "Pil KB" },
                                { value: "3", label: "Kondom" },
                                { value: "6", label: "Suntik" },
                                { value: "2", label: "Implan" },
                            ]} label="Golongan Darah" name="penggunaankontrasepsi" />
                            <_Input label="Riwayat Penyakit Yang diderita Ibu" name="riwayatpenyakit" multiline />
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
                                <_Button label="Simpan Data Kehamilan" color="#096dd9bd" loading={loading} icon={<DownloadOutlined />} submit block sm={4} />
                                <_Button label="Batal" icon={<RollbackOutlined />} onClick={batal} danger block sm={2} />
                            </_Row>

                        </Form>
                        <br />
                        <br />
                    </Spin>

                </CardBody>
            </Card >
        </div >
    )
}

export default InputKehamilanSaatIni
