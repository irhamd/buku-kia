import Card from 'components/Card/Card'
import CardAvatar from 'components/Card/CardAvatar'
import CardBody from 'components/Card/CardBody'
import CardHeader from 'components/Card/CardHeader'
import GridItem from 'components/Grid/GridItem'
import React, { useState, useRef, useCallback } from 'react'
import avatar from "assets/img/faces/marc.jpg";
import GridContainer from 'components/Grid/GridContainer'
import { _TitleBar } from 'services/Forms/Forms'
import { _Button } from 'services/Forms/Forms'
import { Form, Input, Button, Radio, Row, Spin, Image } from 'antd';
import { Col } from 'react-bootstrap';
import { _Search } from 'services/Forms/Forms'
import { _Input } from 'services/Forms/Forms'
import { _Select } from 'services/Forms/Forms'
import { _Date } from 'services/Forms/Forms'
import { _Label, _Number } from 'services/Forms/Forms'
import { _Row } from 'services/Forms/LayoutBootstrap'
import { _Col } from 'services/Forms/LayoutBootstrap'
import { _RadioGroup } from 'services/Forms/Forms'
import { CameraOutlined, RollbackOutlined } from '@ant-design/icons';
import Webcam from 'react-webcam'
import _Api from 'services/Api/_Api'
import { _Swall } from 'services/Toastr/Notify/_Toastr'
import { _Checkbox } from 'services/Forms/Forms'


function InputPasienBaru() {

    const [foto, setFoto] = useState(false)
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    const [form] = Form.useForm()

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        // console.log("imageSrc " , imageSrc)
        setFoto(true)
    }, [webcamRef, setImgSrc]);

    const simpanPasien = (val) => {
        if (!imgSrc) {
            _Swall.warning("Silahkan ambil foto pasien ...")
            return
        }
        const obj = {
            ...val,
            foto: imgSrc
        }
        _Api.post("saveDataPasien", obj).then(res => {
            // console.log(res.data)
            if (res.data.sts == 1) {
                _Swall.success("Berhasil ...")
                form.resetFields()
            } else _Swall.success("Gagal ...")
        }).cath(err => {
            _Swall.success("Gagal /err ...")
        })
    }

    const getFoto = () => {
        return (
            imgSrc && (
                <img style={{ borderColor: "orange", width: "300px", borderRadius: "10px" }}
                    src={imgSrc}
                />
            )
        )
    }

    const videoConstraints = {
        width: 350,
        height: 300,
        facingMode: "user"
    };

    return (
        <div>
            <Card>
                <CardHeader color="primary">
                    <p style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "-6px" }}> INPUT PASIEN BARU </p>
                    <p>Input data pasien baru </p>
                </CardHeader>
                <CardBody>
                    <br />
                    <Form layout="vertical" form={form}
                    initialValues ={{wargamataram : true}}
                    onFinish={simpanPasien} size="large" style={{ marginBottom: "10%" }}>
                        <_Row>
                            <_Col sm={7}>
                                <_Search name="nik" showCount required label="NIK" maxLength={26} />
                                <_Number name="nobuku" required label="Nomor Buku" />
                                <_Row>
                                    <_Input name="tempatlahir" required sm={8} label="Tempat Lahir" />
                                    <_Date name="tgllahir" sm={4} required label="Tanggal Lahir (DD-MM-YYYY)" format={"DD-MM-YYYY"} />
                                </_Row>
                                <_Input name="nama" label="Nama Lengkap" required />
                                <_Row>
                                    <_Input name="nohp" label="No HP (Aktif)" required maxLength={13} sm={5} />
                                    <_Number name="nojkn" label="No. JKN" sm={4} />
                                    <_Checkbox name="wargamataram" label="Warga Mataram" children ="Ya" sm={3} />
                                </_Row>
                                <_Input multiline name="alamat" label="Alamat Lengkap" required />
                                <_Input name="faskestk1" label="Faskes Pertama" />

                                <_RadioGroup options={[
                                    { value: "A", label: "A" },
                                    { value: "B", label: "B" },
                                    { value: "AB", label: "AB" },
                                    { value: "O", label: "O" },
                                ]} label="Golongan Darah" name="goldarah" />

                                <br />
                                <br />
                            </_Col>
                            <_Col sm={4} style={{ textAlign: "center" }}>
                                <Card profile>
                                    <CardAvatar >
                                        <br />
                                        {foto ? getFoto() :
                                            <Webcam height={300}
                                                audio={false}
                                                videoConstraints={videoConstraints}
                                                style={{ borderRadius: "10px" }}
                                                ref={webcamRef}
                                                screenshotFormat="image/jpeg"
                                            />
                                        }
                                    </CardAvatar>
                                    <CardBody profile>
                                        <h6 style={{ marginBottom: "6px" }}>Foto Pasien</h6>
                                        <_Row>
                                            {
                                                !foto ?
                                                    <button type="button" onClick={capture} className="btn-pink w100"> <i className="fa fa-camera" />
                                                        &nbsp;Ambil Gambar</button> :
                                                    <button type="button" onClick={() => setFoto(false)} className="btn-pink w100"> <i className="fa fa-refresh" />
                                                        &nbsp;Ulang</button>
                                                // <button onClick={capture} className="btn-pink">Ambil Gambar</button>:""  
                                            }
                                            {/* <_Button label="Ulang" cancel onClick={() => setFoto(false)} /> */}
                                            {/* <button  >  <span className="fa fa-refresh"></span> Ulang</button> */}
                                            {/* <button className="btn-reset w50">  <span className="fa  fa-file-picture-o"></span> File</button> */}

                                            {/* <_Button block icon={<RollbackOutlined />} sm={5} label="File" /> */}
                                        </_Row>
                                        <br />
                                    </CardBody>
                                </Card>
                            </_Col>

                            <_Button label="Simpan" submit block sm={4} />
                            <_Button label="Batal" danger block sm={4} />
                        </_Row>
                    </Form>


                </CardBody>
            </Card>
        </div>
    )
}

export default InputPasienBaru
