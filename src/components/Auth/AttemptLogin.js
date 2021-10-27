import React, { useEffect, useState } from 'react'
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { Table, Tag, Space, Form, Input, Button, Checkbox, Image } from 'antd';
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";

import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { makeStyles } from "@material-ui/core";
import avatar from "assets/img/faces/logo.png";
import { _Row } from 'services/Forms/LayoutBootstrap';
import { _Col } from 'services/Forms/LayoutBootstrap';
import { _Input } from 'services/Forms/Forms';
import { UserSwitchOutlined, KeyOutlined, GooglePlusOutlined, LoginOutlined } from '@ant-design/icons';
import { _Button } from 'services/Forms/Forms';
import _Api from 'services/Api/_Api';
import Footer from 'components/Footer/Footer';
import { _Toastr } from 'services/Toastr/Notify/_Toastr';
import Swal from 'sweetalert2';
import { Cache } from 'services/Cache';
import { globalText } from 'services/Text/GlobalText';
import { acakText } from 'services/Crypto';
import { useHistory } from 'react-router';
import { logOut } from 'services/Route/ProtectedRoute';


function AttemptLogin() {

    const [loading, setloading] = useState(false)
    const [form] = Form.useForm()

    const history = useHistory()

    const signIn = (e) => {
        setloading(true)
        _Api.post("loginRev", e).then(res => {
            var data = res.data
            var pegawai = JSON.stringify(data.pegawai)
            var user = JSON.stringify(data.user)

            Cache.set(globalText.x_auth_user, acakText(user))
            Cache.set(globalText.x_auth_resu, acakText(pegawai))
            Cache.set(globalText.authorization, acakText(data.token))
            Cache.set(globalText.x_auth_access_token, acakText(data.tokenx))
            Cache.set(globalText.x_auth_refresh_token, new Date().toString())
            // window.location.href = "/admin/dashboard"
            history.push('/admin/dashboard')
            // props.history.push("/home")
        }).catch((err) => {
            setloading(false)
            form.setFieldsValue({
                password: ""
            })
            _Toastr.error('Username atau password tidak ditemukan ...')
        })
    }

    useEffect(() => {
        logOut()
    }, [])


    return (
        <div style={{ background: "#f1cee1", height: "100vh", overflow: "auto" }}>

            <br />
            <Form onFinish={signIn} form={form}>
                <_Row>
                    <_Col sm={3} />
                    <_Col sm={5} style={{ background: "#f1e3ebdb", borderRadius: "3%", boxShadow: "10px 10px #de68a9", textAlign: "center" }} >
                        <Image style={{ width: "60vh" }} preview={false} src={avatar} />
                        <_Row style={{ textAlign: "center" }}>
                            <_Col sm={4} />
                            <_Col sm={6}>
                                <h4 style={{ color: "#de68a9" }}> Sign In </h4>
                                <_Input placeholder="Username" required name="name" addonBefore={<UserSwitchOutlined />} />
                                <_Input password placeholder="Password" required name="password" addonBefore={<KeyOutlined />} />
                            </_Col>

                            <_Col sm={2} />

                            {/* <_Col sm={2} /> */}
                            <_Button block sm={3} submit label="Login" loading={loading} icon={<LoginOutlined />} color="#ff4500d6" />
                            <_Button block sm={6} icon={<GooglePlusOutlined />} label="Login dengan google" color="#096dd9ba" />
                            <br />
                        </_Row>
                        <p style={{ textAlign: "center" }}> &copy; 2021 &nbsp;
                            <a href="http://rsud.mataramkota.go.id/" target="_blank" > http://rsud.mataramkota.go.id </a> &nbsp; simrs@fhdev
                        </p>
                        <br />
                    </_Col>
                </_Row>
            </Form>
            <br />

            {/* <Footer /> */}
        </div>

    )


}

// <Button color="primary" round>
//     Follow
// </Button>
export default AttemptLogin
