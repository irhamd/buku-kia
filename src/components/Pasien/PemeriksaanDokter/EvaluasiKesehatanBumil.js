import avatar from "assets/img/faces/marc.jpg";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useEffect, useState } from "react";

import { List, Avatar, Space, Image, Row, Col, Checkbox } from 'antd';
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

function EvaluasiKesehatanBumil() {

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
            cekRefresh()
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
                                <_Label label="USG" />
                                <Form size="small" name="riwayatkesehatanibu"
                                    labelCol={{
                                        span: 12,
                                    }}
                                    wrapperCol={{
                                        span: 12,
                                    }}
                                    autoComplete="off"
                                >
                                    <Checkbox.Group style={{ width: '100%' }} onChange={(cc) => console.log(`cc`, cc)}>
                                        <Row>
                                            <Col span={8}>
                                                <Checkbox value="A">A</Checkbox>
                                            </Col>
                                            <Col span={8}>
                                                <Checkbox value="B">B</Checkbox>
                                            </Col>
                                            <Col span={8}>
                                                <Checkbox value="C">C</Checkbox>
                                            </Col>
                                            <Col span={8}>
                                                <Checkbox value="D">D</Checkbox>
                                            </Col>
                                            <Col span={8}>
                                                <Checkbox value="E">E</Checkbox>
                                            </Col>
                                        </Row>
                                    </Checkbox.Group>,
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

export default EvaluasiKesehatanBumil
