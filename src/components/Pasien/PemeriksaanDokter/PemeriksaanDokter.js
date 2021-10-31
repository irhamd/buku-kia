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
function PemeriksaanDokter() {

    const [pasienRujuk, setpasienRujuk] = useState([])
    const [loading, setloading] = useState(false);
    const [src, setsrc] = useState(null);

    const getData = () => {
        setloading(true)
        _Api.get("getPasienRujuk?rujuk=0").then(res => {
            console.log(`res.data`, res.data.data)
            setpasienRujuk(res.data.data)
            // setloading(false)
        })
    }

    const [formKehamilan] = Form.useForm();

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    useEffect(() => {
        getData()
    }, [])

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

    return (
        <div>
            <Card>
                <CardHeader color="primary">
                    <p style={{ fontSize: "24px", fontWeight: "bold", fontSize: "20px", marginBottom: "-6px" }}> PEMERIKSAAN DOKTER </p>
                    <p>Pemeriksaan dilakukan oleh dokter</p>
                </CardHeader>
                <CardBody>
                    <DetailPasien />
                    <_Row>
                        <_Col sm={5} style={{ background: "white" }}>
                            <_Label label="Pemeriksaan Fisik" />
                            <Form size="small"
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
                                <_RadioGroup options={opsi} label="Leher" name="Leher" />
                                <_RadioGroup options={opsi} label="Gigi Mulut" name="Gigi Mulut" />
                                <_RadioGroup options={opsi} label="THT" name="THT" />
                                <_RadioGroup options={opsi} label="Dada | Jantung" name="dada jantung" />
                                <_RadioGroup options={opsi} label="Paru" name="Paru" />
                                <_RadioGroup options={opsi} label="Perut" name="Perut" />
                                <_RadioGroup options={opsi} label="Tungkai" name="Tungkkai" />
                            </Form>
                            <_Label label="USG" />
                            <Form size="small"
                                labelCol={{
                                    span: 12,
                                }}
                                wrapperCol={{
                                    span: 12,
                                }}
                                // onFinish={onFinish} form={formKehamilan}
                                autoComplete="off"
                            >
                                <_Input name="gs" addonAfter="cm" label="GS ( Gestational Sac)" />
                                <_Input name="crl" addonAfter="cm" label=" CRL (Crown-rump Length)" />
                                <_Input name="djj" addonAfter="dpm" label="DJJ (Denyut Jantung Janin)" />
                                <_Input name="usiakehamilan" addonAfter="minggu" label="Sesuai Usia Kehamilan" />
                                <_Input name="letakjanin" addonAfter="intrauterin" label="Letak Janin" />
                                <_Date label="Taksir Persalinan (dd-mm-yyyy)" format={"DD-MM-YYYY"} />

                            </Form>

                        </_Col>
                        <_Col sm={6} style={{ background: "#de68a940", padding: "10px" }}>
                            <p className="tengah b"> Hasil USG </p>
                            <p style={{ textAlign: "center" }}>
                                {
                                    src && <Image
                                        width={700}
                                        src={src}
                                    />
                                }
                            </p>
                            <_Button cancel sm={2} label="Clear" onClick={clearImage} />

                            <ImgCrop rotate>
                                <Upload
                                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={onChange}
                                // previewFile={false}
                                // onPreview={onPreview}
                                >
                                    {fileList.length < 1 && '+ Upload'}
                                </Upload>
                            </ImgCrop>

                            {/* <Image src={src} alt="Neee gambar" /> */}





                        </_Col>
                    </_Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default PemeriksaanDokter
