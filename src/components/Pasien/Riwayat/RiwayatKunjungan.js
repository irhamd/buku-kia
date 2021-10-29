import React, { useState, useEffect } from 'react';

import { Table, Tag, Space, Form, Input, Button, Drawer, List } from 'antd';
import _Api from 'services/Api/_Api';
import moment from 'moment';
import { formatTgl } from 'services/Text/GlobalText';
import DetailPasien from '../DetailPasien.js';

function RiwayatKunjungan(pr) {


    const columns = [
        {
            title: 'Kunnjungan Ke ',
            dataIndex: 'kunjunganke',
            sorter: true,
            fixed: 'left',
            width: '100px',
        },
        {
            title: 'Tanggal',
            render: (rc) => (<>
                {formatTgl(rc.tanggal)}
            </>),
            sorter: true,
            width: '130px',
            fixed: 'left',
        },
        {
            title: 'Faskes',
            dataIndex: 'unitkerja',
            sorter: true,
            fixed: 'left',
            width: '200px',
        },
        {
            title: 'Petugas Pelaksana',
            dataIndex: 'namapegawai',
            sorter: true,
            width: '200px',
        },

        {
            title: 'Keluhan',
            width: "400px",
            render: (rc) => (<>
                <ol>
                    {
                        rc.keluhan && rc.keluhan.map((item, i) => {
                            return (
                                <li key={i}> <b> {item.keluhan} </b> </li>
                            )
                        })
                    }
                </ol>
            </>),
        },
        {
            title: 'Hasil Lab',
            width: "500px",
            render: (rc) => (<>
                <ol>
                    {
                        rc.hasillab && rc.hasillab.map((item, i) => {
                            return (
                                <li key={i}> <b> {item.hasillab} </b> </li>
                            )
                        })
                    }
                </ol>

            </>),
        },
        {
            title: 'Berat Badan (BB)',
            width: '200px',
            render: (text, rc) => (<> {rc.beratbadan} Kg </>),
        },

        {
            title: 'Berat Badan (BB)',
            width: '200px',
            render: (text, rc) => (<> {rc.beratbadan} Kg </>),
        },
        {
            title: 'Tekanan Darah (TD)',
            width: '200px',
            render: (rc) => (<> {rc.tekanandarah} (mmHg) </>),
        },
        {
            title: 'Tinggi Fundus (TF)',
            width: "100px",
            render: (rc) => (<> {rc.tinggifundus}  </>),
        },
        {
            title: 'Imunisasi',
            width: "100px",
            render: (rc) => (<> {rc.imunisasi}  </>),
        },
        {
            title: 'Analisa',
            width: "300px",
            render: (rc) => (<> {rc.analisa}  </>),
        },
        {
            title: 'Tablet Tambah Darah',
            width: "150px",
            render: (rc) => (<> {rc.tablettambahdarah} transfusi  </>),
        },
        {
            title: 'Lila',
            width: "100px",
            render: (rc) => (<> {rc.lila} cm  </>),
        },
        {
            title: 'Tata Laksana',
            width: "200px",
            render: (rc) => (<> {rc.tatalaksana}  </>),
        },
        {
            title: 'Masuk Panggul',
            width: "100px",
            render: (rc) => (<>
                <Tag color={"orange"}>
                    {rc.masukpanggul}
                </Tag>
            </>),
        },
        {
            title: 'Berat Janin',
            width: "100px",
            render: (rc) => (<> {rc.beratjanin} gram  </>),
        },
        {
            title: 'Konseling',
            width: "400px",
            render: (rc) => (<> <b> {rc.konseling} </b> gram  </>),
        },
    ];
    return (
        <>
            <Drawer
                placement="top"
                style={{ margin: "-10px" }}
                headerStyle={{ background: "#f19ecf", height: "76px" }}
                onClose={pr.onClose}
                height={700}
                visible={pr.visible}
                getContainer={false}
            >
                <_Label label="Riwayat Registrasi" />

                <DetailPasien />
                <Table loading={pr.loading} bordered
                    rowKey="id" dataSource={pr.dataRiwayat && pr.dataRiwayat} columns={columns} scroll={{ x: 3100 }} />;
            </Drawer>
        </>
    );
}

export default RiwayatKunjungan
