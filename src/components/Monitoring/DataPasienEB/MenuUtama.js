import React from 'react'
import { Image, Modal, Menu } from 'antd';
import { AlertOutlined, AppstoreOutlined, DislikeOutlined, EnvironmentOutlined, FallOutlined, MailOutlined, QuestionCircleOutlined, SettingOutlined, SisternodeOutlined, SmileOutlined, SolutionOutlined, UserOutlined, WhatsAppOutlined } from '@ant-design/icons';

function MenuUtama(pr) {

    const { Item, SubMenu } = Menu
    return (
        <div>
            <Menu mode="horizontal" style={{ background: "#ffc107", fontWeight: "bolder" }} size="large">
                <Item key="mail" icon={<AlertOutlined />} onClick={pr.showPasien}>
                    Pasien Emergency
                </Item>
                <Item key="app" icon={<AppstoreOutlined />} onClick={pr.showPasienHP} >
                    List No. HP
                </Item>
                <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Laporan - Laporan">
                    <Item key="setting:1">Laporan Emergency1</Item>
                    <Item key="setting:2">Riwayat Pasien</Item>
                    <Item key="setting:3">Timeline</Item>

                </SubMenu>
                <Item key="alipay">
                    <a target="_blank" rel="noopener noreferrer">
                        SIMRS
                    </a>
                </Item>
            </Menu>
        </div>
    )
}

export default MenuUtama
