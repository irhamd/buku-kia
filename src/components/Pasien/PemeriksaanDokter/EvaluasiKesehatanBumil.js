import avatar from "assets/img/faces/marc.jpg";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useEffect, useState } from "react";
import { Table } from 'react-bootstrap'

import { List, Avatar, Space, Image, Row, Col, Checkbox } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined, UploadOutlined, PlusOutlined, RollbackOutlined } from '@ant-design/icons';
import _Api from "services/Api/_Api";
import { _Row } from "services/Forms/LayoutBootstrap";
import { _Col } from "services/Forms/LayoutBootstrap";
import { _Label, _Input } from "services/Forms/Forms";

import { Form, Upload, message, Button } from "antd"
import { _RadioGroup } from "services/Forms/Forms";
import { _Date } from "services/Forms/Forms";
import ImgCrop from 'antd-img-crop';
import { _Button } from "services/Forms/Forms";
import DetailPasien from "../DetailPasien";
import { _Cache } from "services/Cache";
import moment from "moment";
import { _Swall } from "services/Toastr/Notify/_Toastr";
import { baseURL } from "services/Api/_Api";
import axios from 'axios'
import { authToken } from "services/Api/_Api";
import { _Number } from "services/Forms/Forms";

const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
};

function cekRefresh() {
    window.addEventListener("beforeunload", alertUser);
    return () => {
        window.removeEventListener("beforeunload", alertUser);
    };
}

const kanan = { marginRight: "-15px" }


const style = {
    checkbox: { background: "#bce7ee", margin: "2px", padding: "5px", width: "98%" },
}

function EvaluasiKesehatanBumil() {


    const [formKehamilan] = Form.useForm();


    var data = _Cache.get('x-pacient')
    var dataPasien = {}
    if (data) {
        dataPasien = JSON.parse(data)
        // console.log('INI ADAKAHHH', dataPasien)
    }


    const aaa = false

    useEffect(() => {
        // getData()
        // if (aaa) {
        //     cekRefresh()
        // }

    }, []);



    const opsi = [
        { value: "normal", label: "Normal" },
        { value: "tidak", label: "Tidak Normal" },
    ]

    const plusminus = [
        { value: "+", label: "+" },
        { value: "-", label: "-" },
    ]


    const submitProvider = (name, { forms }) => {

        console.log(`info`, forms)
        var form_riwayatkehamilan = forms.form_riwayatkehamilan.getFieldsValue()
        var kondisiibu = forms.kondisiibu.getFieldsValue()
        var riwayatkesehatanibu = forms.riwayatkesehatanibu.getFieldsValue()
        var statusimunisasi = forms.statusimunisasi.getFieldsValue()
        var formpemeriksaankhusus = forms.formpemeriksaankhusus.getFieldsValue()

        var obj = {
            form_riwayatkehamilan,
            kondisiibu,
            riwayatkesehatanibu,
            statusimunisasi,
            formpemeriksaankhusus,
        }

        console.log(`valuePemeriksaan`, obj)



        // _Api.post("simpanPemeriksaanDokter", obj).then(res => {
        //     // console.log(res.data)
        //     // form.resetFields()

        //     var myFormData = new FormData();
        //     myFormData.append('fileusg', fileList);

        //     if (res.data.sts == 1)
        //         _Swall.success("Suksess .")
        //     else
        //         _Swall.error("Gagal simpan data ...")

        // }).cath(err => {
        //     _Swall.error("Gagal simpan data . ")
        // })

        // console.log(`getVlaue`, obj)
    }


    const riwayatKesehatan = [
        { val: "1", value: "Hipertensi" },
        { val: "2", value: "Jantung" },
        { val: "3", value: "Tyroid" },
        { val: "4", value: "Alergi" },
        { val: "5", value: "Alergi" },
        { val: "6", value: "Autoimun" },
        { val: "7", value: "Asma" },
        { val: "8", value: "TB" },
        { val: "9", value: "Hepatitis B" },
        { val: "10", value: "Jiwa" },
        { val: "11", value: "Sifilis" },
    ]

    const statusImuniasasi = [
        { val: "1", value: "Awal" },
        { val: "2", value: "1 Bulan / 3 Tahun" },
        { val: "3", value: "6 Bulan / 5 Tahun" },
        { val: "4", value: "12 Bulan / 10 Tahun" },
        { val: "5", value: "12 Bulan / > 25 Tahun" },

    ]

    const riwayatPrilaku = [
        { val: "1", value: "Merokok" },
        { val: "2", value: "Pola makan beresiko" },
        { val: "3", value: "Aktifitas fisik kurang" },
        { val: "4", value: "Alkohol" },
        { val: "5", value: "Obat - obatan" },
        { val: "6", value: "Kosmetik" },
    ]

    const riwayatpenyakitKeluarga = [
        { val: "1", value: "Hipertensi" },
        { val: "2", value: "Diabetes" },
        { val: "3", value: "SesakNafas" },
        { val: "4", value: "Jantung" },
        { val: "5", value: "TB" },
        { val: "6", value: "Alergi" },
        { val: "7", value: "Jiwa" },
        { val: "8", value: "Kelainan Darah" },
        { val: "9", value: "Hepatitis B" },
    ]

    const render_riwayatpenyakitKeluarga = riwayatpenyakitKeluarga.map((ii, i) => {
        return (
            <Col key={i} span={8}>
                <Checkbox style={style.checkbox} value={ii.val}>{ii.value}</Checkbox>
            </Col>
        )
    })

    const render_riwayatKesehatan = riwayatKesehatan.map((ii, i) => {
        return (
            <Col key={i} span={8}>
                <Checkbox style={style.checkbox} value={ii.val}>{ii.value}</Checkbox>
            </Col>
        )
    })

    const renderstatusImuniasasi = statusImuniasasi.map((ii, i) => {
        return (
            <Col key={i} span={24}>
                <Checkbox style={style.checkbox} value={ii.val}>{ii.value}</Checkbox>
            </Col>
        )
    })

    const render_riwayatPrilaku = riwayatPrilaku.map((ii, i) => {
        return (
            <Col key={i} span={8} >
                <Checkbox style={style.checkbox} value={ii.val}>{ii.value}</Checkbox>
            </Col>
        )
    })


    return (
        <div>
            <Card>
                <CardHeader color="primary">
                    <p style={{ fontSize: "24px", fontWeight: "bold", fontSize: "20px", marginBottom: "-6px" }}> EVALUASI KESEHATAN IBU HAMIL </p>
                    <p>Evaluasi kesehatan ibu hamil</p>
                </CardHeader>
                <CardBody>
                    <Form.Provider
                        onFormFinish={submitProvider}>
                        <DetailPasien />
                        <_Row>
                            <_Col sm={5} style={{ background: "white" }}>
                                <_Label label="Kondisi kesehatan ibu" />
                                <Form name="kondisiibu"
                                    labelCol={{
                                        span: 8,
                                    }}
                                    wrapperCol={{
                                        span: 16,
                                    }}
                                    autoComplete="off"
                                >
                                    <_Input name="tb" addonAfter="cm" label="TB" />
                                    <_Input name="bb" addonAfter="kg" label="BB" />
                                    <_Input name="lila" label="Lila" addonAfter="cm" />

                                </Form>
                                <_Label label="Riwayat Kesehatan Ibu Sekarang" />
                                <Form name="riwayatkesehatanibu" style={{ width: '100%', marginLeft: "14px" }}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        name="riwayatkesehatanibu1">
                                        <Checkbox.Group>
                                            <Row >
                                                {render_riwayatKesehatan}
                                            </Row>
                                        </Checkbox.Group>
                                    </Form.Item>
                                    <p className="fkanan i"> <small> Centang yang sesuai </small> </p>
                                    <_Input multiline name="riwayatlainnya" label="Lainnya" />
                                </Form>
                            </_Col>
                            <_Col sm={6} style={{ paddingLeft: "10px" }}>
                                <Form name="statusimunisasi">
                                    <_Label label="Status Imunisasi " />
                                    <span> ( Selang waktu / Perlindungan)</span>
                                    <Form.Item
                                        name="statusimunisasi_checked">
                                        <Checkbox.Group style={{ width: '100%' }}>
                                            <Row >
                                                {renderstatusImuniasasi}
                                            </Row>
                                        </Checkbox.Group>
                                    </Form.Item>
                                    <p>Kesimpulan :  Status imunisasi</p>
                                    <_Label label="Riwayat Prilaku Bersesiko 1 Bulan Sebelum hamil " />
                                    <Form.Item
                                        name="riwayatprilaku_checked">
                                        <Checkbox.Group>
                                            <Row >
                                                {render_riwayatPrilaku}
                                            </Row>
                                        </Checkbox.Group>
                                    </Form.Item>
                                    <p className="fkanan i"> Centang pilihan yang beresiko </p>
                                    <_Input label="Lain-lain jelaskan" multiline name="riwayatprilaku_lain" />
                                </Form>
                            </_Col>

                            <_Col>
                                <br />
                                <p style={{ fontSize: "15px", fontWeight: "bold", background: "rgb(243, 195, 99)", padding: "4px" }}> &nbsp; Riwayat Kehamilan dan Persalinan (termasuk Keguguran , Kembar dan Lahir Mati) </p>
                                <Form name="form_riwayatkehamilan">
                                    <Table borderless size="sm">
                                        <Form.List name="detail">
                                            {(fields, { add, remove }) => (
                                                <>
                                                    <thead style={{ background: "#40a9ffb5" }}>
                                                        <tr>
                                                            <th width={10} style={{ textAlign: "center" }}>No</th>
                                                            <th style={{ textAlign: "center" }}>Tahun</th>
                                                            <th>Berat Lahir (gr)</th>
                                                            <th>Persalinan</th>
                                                            <th>Penolong Persalinan</th>
                                                            <th>Komplikasi</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                                                            <tr>
                                                                <td width={10} style={{ textAlign: "center" }}>
                                                                    {name + 1}
                                                                </td>
                                                                <td width="170" style={{ paddingRight: "4px" }}> <_Input name={[name, 'tahun']} mb="-10px" style={kanan} fieldKey={[fieldKey, 'tahun']} {...restField} /> </td>
                                                                <td width="170" style={{ paddingRight: "4px" }}> <_Input name={[name, 'berat']} mb="-10px" style={kanan} fieldKey={[fieldKey, 'berat']} {...restField} addonAfter="gram" /> </td>
                                                                <td width="170" style={{ paddingRight: "4px" }}>  <_Input name={[name, 'persalinan']} mb="-10px" style={kanan} fieldKey={[fieldKey, 'persalinan']} {...restField} /></td>
                                                                <td width="170" style={{ paddingRight: "4px" }}> <_Input name={[name, 'penolong']} mb="-10px" style={kanan} fieldKey={[fieldKey, 'penolong']} {...restField} /> </td>
                                                                <td width="170" style={{ paddingRight: "4px" }}> <_Input name={[name, 'komplikasi']} mb="-10px" style={kanan} fieldKey={[fieldKey, 'komplikasi']} {...restField} /> </td>

                                                                <td width="5">
                                                                    <_Button color="orange" block icon={<RollbackOutlined />} onClick={() => remove(name)} label="Batal" />
                                                                </td>
                                                            </tr>

                                                        ))}
                                                    </tbody>
                                                    <Form.Item>
                                                        <br />
                                                        <Button type="primary" onClick={() => add()}
                                                            icon={<PlusOutlined />}>  Tambah </Button>
                                                    </Form.Item>
                                                </>
                                            )}
                                        </Form.List>
                                    </Table>
                                    <_Input multiline name="riwayatlainnya" label="Lainnya" />

                                    <_Label label="Riwayat Penyakit Keluarga" />
                                    <_Row>
                                        <_Col sm={6}>
                                            <Form.Item
                                                name="riwayatpenyakitkeluarga">
                                                <Checkbox.Group>
                                                    <Row >
                                                        {render_riwayatpenyakitKeluarga}
                                                    </Row>
                                                </Checkbox.Group>
                                            </Form.Item>
                                            <p className="fkanan i"> <small> Centang yang sesuai </small> </p>
                                        </_Col>
                                        <_Col>
                                            <_Input multiline name="riwayatpenyakitkeluarga_lainnya" label="Lain - lain, jelaskan " />
                                        </_Col>
                                    </_Row>
                                </Form>

                                <_Label label="Pemeriksaan Khusus" />
                                <Form name="formpemeriksaankhusus"
                                    labelCol={{
                                        span: 8,
                                    }}
                                    wrapperCol={{
                                        span: 16,
                                    }}
                                    // onFinish={onFinish} form={formKehamilan}
                                    autoComplete="off"
                                >
                                    <_Input name="inspeksiinspekulo" multiline label="Inspeksi/ Inspekulo" />
                                    <_RadioGroup options={opsi} label="Vulva" name="vulva" />
                                    <_RadioGroup options={opsi} label="Uretra" name="uretra" />
                                    <_RadioGroup options={opsi} label="Vagina" name="vagina" />
                                    <_RadioGroup options={plusminus} label="Fluksus" name="fluksus" />
                                    <_RadioGroup options={plusminus} label="Fluor" name="fluor" />
                                    <_RadioGroup options={opsi} label="Porsio" name="porsio" />
                                    <hr />
                                    <_Button save submit label="Simpan" sm={4} block color="orangered" size="large" />
                                </Form>

                            </_Col>

                        </_Row>
                    </Form.Provider>
                </CardBody>
            </Card>
        </div>
    )
}

export default EvaluasiKesehatanBumil
