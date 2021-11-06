import avatar from "assets/img/faces/marc.jpg";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useEffect, useState } from "react";

import { List, Avatar, Space, Image } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined, UploadOutlined } from '@ant-design/icons';
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

function PemeriksaanDokter() {

    const [pasienRujuk, setpasienRujuk] = useState([])
    const [loading, setloading] = useState(false);
    const [src, setsrc] = useState(null);
    const [formKehamilan] = Form.useForm();


    var data = _Cache.get('x-pacient')
    var dataPasien = {}
    if (data) {
        dataPasien = JSON.parse(data)
        // console.log('INI ADAKAHHH', dataPasien)
    }

    const getData = () => {
        setloading(true)
        _Api.get("getPasienRujuk?rujuk=0").then(res => {
            console.log(`res.data`, res.data.data)
            setpasienRujuk(res.data.data)
            // setloading(false)
        })
    }


    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const aaa = true



    useEffect(() => {
        getData()
        if (aaa) {
            // cekRefresh()
        }

    }, []);





    const [fileList, setFileList] = useState([]);

    const onChange = async ({ fileList: newFileList }) => {
        setFileList(newFileList);

        // console.log(fileList[0])
        if (fileList[0]) {
            let aaa = await getBase64(fileList[0].originFileObj)
            setsrc(aaa)
        }

        // let src = file.url;

        // const reader = new FileReader();
        // reader.readAsDataURL(file.originFileObj);
        // reader.onload = () => {
        //     resolve(reader.result);
        //     setsrc(render.result)


        // }

    };

    const onPreview = async file => {
        // let src = file.url;
        // if (!src) {
        //     src = await new Promise(resolve => {
        //         const reader = new FileReader();
        //         reader.readAsDataURL(file.originFileObj);
        //         reader.onload = () => {
        //             resolve(reader.result);
        //             setsrc(src)
        //         }
        //     });
        // }
        // const image = new Image();
        // image.src = src;
        // const imgWindow = window.open(src);
        // imgWindow.document.write(image.outerHTML);
    };



    const opsi = [
        { value: "normal", label: "Normal" },
        { value: "tidak", label: "Tidak Normal" },
    ]

    const clearImage = () => {
        setsrc(null)
        setFileList([])
    }

    const submitProvider = (name, info) => {

        if (!src) {
            _Swall.error("Silahkan pilih foto USG")
            return
        }
        let form = info.forms;

        var valueUsg = form.formusg.getFieldsValue()
        var valuePemeriksaan = form.formpemeriksaan.getFieldsValue()

        let obj = {
            ...valueUsg,
            ...valuePemeriksaan,
            id_pasien: dataPasien && dataPasien.id,
            kunjunganke: dataPasien && dataPasien.kunjunganke + 1,
            htp: moment(valuePemeriksaan.htp).format('YYYY-MM-DD')
        }

        var bod = new FormData();

        var keys = Object.keys(obj)
        bod.append('fileusg', fileList[0].originFileObj);
        Object.values(obj).forEach((val, i) => {
            bod.append(keys[i], val);
        });

        axios({
            method: "post",
            url: baseURL + "simpanPemeriksaanDokter",
            data: bod,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${authToken}`
            },
        })
            .then(function (res) {
                if (res.data && res.data.sts == 1) {
                    _Swall.success("Sukses ..")
                } else {
                    _Swall.error("Gagal ...")
                }
            })
            .catch(function (res) {
                _Swall.error("Gagal {err}...")

            });


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


    return (
        <div>
            <Card>
                <CardHeader color="primary">
                    <p style={{ fontSize: "24px", fontWeight: "bold", fontSize: "20px", marginBottom: "-6px" }}> PEMERIKSAAN DOKTER </p>
                    <p>Pemeriksaan dilakukan oleh dokter</p>
                </CardHeader>
                <CardBody>
                    <Form.Provider
                        onFormFinish={submitProvider}>
                        <DetailPasien />
                        <_Row>
                            <_Col sm={5} style={{ background: "white" }}>
                                <_Label label="Pemeriksaan Fisik" />
                                <Form size="small" name="formpemeriksaan"
                                    labelCol={{
                                        span: 8,
                                    }}
                                    wrapperCol={{
                                        span: 16,
                                    }}
                                    // onFinish={onFinish} form={formKehamilan}
                                    autoComplete="off"
                                >
                                    <_Input name="keadaanumum" multiline label="Keadaan Umum" />
                                    <_RadioGroup options={opsi} label="Sklera" name="sklera" />
                                    <_RadioGroup options={opsi} label="kulit" name="kulit" />
                                    <_RadioGroup options={opsi} label="Leher" name="leher" />
                                    <_RadioGroup options={opsi} label="Gigi Mulut" name="gigimulut" />
                                    <_RadioGroup options={opsi} label="THT" name="tht" />
                                    <_RadioGroup options={opsi} label="Dada | Jantung" name="datajantung" />
                                    <_RadioGroup options={opsi} label="Paru" name="paru" />
                                    <_RadioGroup options={opsi} label="Perut" name="perut" />
                                    <_RadioGroup options={opsi} label="Tungkai" name="tungkkai" />
                                </Form>
                                <_Label label="USG" />
                                <Form size="small" name="formusg"
                                    labelCol={{
                                        span: 12,
                                    }}
                                    wrapperCol={{
                                        span: 12,
                                    }}
                                    autoComplete="off"
                                >
                                    <_Input name="gs" addonAfter="cm" label="GS ( Gestational Sac)" />
                                    <_Input name="crl" addonAfter="cm" label=" CRL (Crown-rump Length)" />
                                    <_Input name="djj" addonAfter="dpm" label="DJJ (Denyut Jantung Janin)" />
                                    <_Input name="usiakehamilan" addonAfter="minggu" label="Sesuai Usia Kehamilan" />
                                    <_Input name="letakjanin" addonAfter="intrauterin" name="letakjanin" label="Letak Janin" />
                                    <_Date label="Taksir Persalinan (dd-mm-yyyy)" name="htp" format={"DD-MM-YYYY"} />

                                    <_Button save submit label="Simpan" sm={4} block color="orangered" size="large" />
                                </Form>
                                <hr />


                            </_Col>
                            <_Col sm={6} style={{ background: "#000000", borderRadius: "15px", padding: "10px" }}>
                                <p className="tengah b"> Hasil USG </p>
                                <p style={{ textAlign: "center" }}>
                                    {
                                        src && <> <Image
                                            width={700}
                                            src={src}
                                        />
                                            <_Button cancel sm={2} label="Clear" onClick={clearImage} />
                                        </>
                                    }

                                </p>
                                {/* <ImgCrop rotate> */}
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={onChange}
                                >
                                    {fileList.length < 1 && '+ Upload'}
                                </Upload>
                                {/* </ImgCrop> */}
                            </_Col>
                        </_Row>
                    </Form.Provider>
                </CardBody>
            </Card>
        </div>
    )
}

export default PemeriksaanDokter
