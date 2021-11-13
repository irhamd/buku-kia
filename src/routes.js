import Dashboard from "@material-ui/icons/Dashboard";
import DataPasien from "components/Pasien/DataPasien";
import { PersonAdd, People } from "@material-ui/icons";
import InputPasienBaru from "components/Pasien/InputPasienBaru";
import InputKehamilanSaatIni from "components/DataKehamilan/InputKehamilanSaatIni";
import InputKunjungan from "components/Kunjungan/InputKunjungan";
import JadwalKunjungan from "components/DataKehamilan/JadwalKunjungan";
import DataPasienRujuk from "components/Pasien/Rujukan/DataPasienRujuk";
import PemeriksaanDokter from "components/Pasien/PemeriksaanDokter/PemeriksaanDokter";
import { _Cache } from "services/Cache";
import { dataPegawai, userLogin } from "services/Text/GlobalText";
import LembarKerjaBidan from "components/Pasien/LembarKerjaBidan";
import AturTindakan from "components/Master/AturTindakan";
import EvaluasiKesehatanBumil from "components/Pasien/PemeriksaanDokter/EvaluasiKesehatanBumil";
import TestFirebase from "components/Test/TestFirebase";
import TestMaps from "components/Test/TestMaps";
import MonitoringPasienEmergency from "components/Test/MonitoringPasienEmergency";
import PasienRegistrasi from "components/Pasien/PasienRegistrasi";
import TestFirebasePuskesmas from "components/Test/TestFirebasePuskesmas";
import { routes_bidan } from "routes/routes_bidan";
import { routes_dokter } from "routes/routes_dokter";
import { routes_rs } from "routes/routes_rs";
 

// var role =  _Cache.get(globalText.x_auth_resu)

// console.log(`userLogin`, userLogin)

var role = userLogin.role


var dashboardRoutes = ""

switch (role) {
  case 'dokter':
    dashboardRoutes = routes_dokter
    break;
  case 'bidan':
    dashboardRoutes = routes_bidan
    break;
  case 'rs':
    dashboardRoutes = routes_rs
    break;

}

export default dashboardRoutes;
