import moment from "moment"
import { _Cache } from "services/Cache"
import { ubahText } from "services/Crypto"

export const globalText = {
    'x_auth_user': 'x-auth-user',
    // 'y_auth_fhdev': 'y-auth-fhdev0012',
    'x_auth_resu': 'x-auth-resu',
    'authorization': 'authorization',
    // 'x_auth_pegawai': 'x-auth-pegawai',
    'x_auth_access_token': 'x-auth-access-token',
    'x_auth_refresh_token': 'x-auth-refresh-token',
}

export const gcookies = {
    'kia': '_kia_rems',
}

export const terbilang = require('angka-menjadi-terbilang')

export const fitrah = {
    getUmur(tgl) {
        const tahun = parseInt(Math.floor(moment(new Date()).diff(moment(tgl), 'year', true)))
        const bulan = parseInt(Math.floor(moment(new Date()).diff(moment(tgl), 'month', true)))
        const hari = parseInt(Math.floor(moment(new Date()).diff(moment(tgl), 'day', true)))
        const jam = parseInt(Math.floor(moment(new Date()).diff(moment(tgl), 'hours', true)))

        // let cek = tahun > 0 ? tahun : bulan > 0 ? bulan : hari > 0 ? hari : jam > 0 ? jam : ""
        if (tahun > 0) return tahun + ' tahun'
        if (bulan > 0) return bulan + ' bulan'
        if (hari > 0) return hari + ' hari'
        if (jam > 0) return jam + ' jam'
    },

    getUmurKehamilan(tgl, desc) {
        const tahun = parseInt(Math.floor(moment(new Date()).diff(moment(tgl), 'year', true)))
        const bulan = parseInt(Math.floor(moment(new Date()).diff(moment(tgl), 'month', true)))
        const minggu = parseInt(Math.floor(moment(new Date()).diff(moment(tgl), 'day', true)) / 7)
        const hari = parseInt(Math.floor(moment(new Date()).diff(moment(tgl), 'day', true)))
        const jam = parseInt(Math.floor(moment(new Date()).diff(moment(tgl), 'hours', true)))

        // let cek = tahun > 0 ? tahun : bulan > 0 ? bulan : hari > 0 ? hari : jam > 0 ? jam : ""
        if (tahun > 0) return desc ?  tahun + ' tahun' : tahun
        if (minggu > 0) return desc ?  minggu + ' minggu' : minggu
        if (hari > 0) return desc ?  hari + '  hari' : hari
        if (jam > 0) return desc ?  jam + ' jam' : jam
    }
}

export const formatNumber = (x) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
}

export const formatTgl = (x) => {
    var tgl = moment(x).format("DD-MM-YYYY")
    return tgl == 'Invalid date' ? "-" : tgl
}
export const formatTglWaktu = (x) => {
    return moment(x).format("DD-MM-YYYY HH:mm")
}
export const fDB = (x) => {
    return moment(x).format("YYYY-MM-DD HH:mm:ss")
}

export const marksSkalaNyeri = {

    0: { style: { color: 'green', }, label: <strong>{"0 : Ringan"}</strong>, },
    1: { style: { color: 'green', }, label: <strong>1 [Ringan]</strong>, },
    2: { style: { color: 'green', }, label: <strong>2 [Ringan]</strong>, },
    3: { style: { color: 'green', }, label: <strong>3 [Ringan]</strong>, },
    4: { style: { color: 'orange', }, label: <strong>4 [Sedang]</strong>, },
    5: { style: { color: 'orange', }, label: <strong>5 [Sedang]</strong>, },
    6: { style: { color: 'orange', }, label: <strong>6 [Sedang]</strong>, },
    7: { style: { color: 'red', }, label: <strong>7 [Berat]</strong>, },
    8: { style: { color: 'red', }, label: <strong>8 [Berat]</strong>, },
    9: { style: { color: 'red', }, label: <strong>9 [Berat]</strong>, },
    10: { style: { color: 'red', }, label: <strong>10 [Berat]</strong>, },
};

export const jeniskelamin = [
    { label: 'Laki-laki', value: 'Laki-laki' },
    { label: 'Perempuan', value: 'Perempuan' },
];

export const pendidikanakhir = [
    { id: 'SMA', pendidikanakhir: 'SMA' },
    { id: 'S1', pendidikanakhir: 'S1' },
    { id: 'S2', pendidikanakhir: 'S2' },
    { id: 'S3', pendidikanakhir: 'S3' },
];

export const getDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
export const getDate = moment().format('YYYY-MM-DD')


var dat = ubahText(_Cache.get(globalText.x_auth_resu))
export var dataPegawai = JSON.parse(dat ? dat : "{}")

var user = ubahText(_Cache.get(globalText.x_auth_user))
export var userLogin = JSON.parse(user ? user : "{}")

export const _role = {
    admin: 'admin',
    bidan: 'bidan',
    dokter: 'dokter'
}


const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
};

export function cekRefresh() {
    window.addEventListener("beforeunload", alertUser);
    return () => {
        window.removeEventListener("beforeunload", alertUser);
    };
}